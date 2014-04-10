dirty = require 'dirty'
db = dirty('deploy.db')
Docker = require 'dockerode'
docker = new Docker({socketPath: '/var/run/docker.sock'})
git = require 'git-rev'
tar = require 'tar-fs'

db.on 'load', ->
  metadata = db.get 'container'
  unless metadata? then metadata = {}
  needsUpgrade metadata.git_id, (upgrade, latestGitId) ->
    unless upgrade or process.argv[2] is "rebuild"
      console.log "Blog is up-to-date, no changes needed"
    else
      buildNewImage (imageId) ->
        console.log "\nbuilding done"
        console.log 'new image is ' + imageId

        # Stop old container
        console.log 'stopping old container'
        stopOldContainer metadata.container_id, ->

          # Start new container
          console.log 'starting new container'
          startNewContainer (newContainerId) ->

            # Update metadata
            db.set('container', { git_id: latestGitId, container_id: newContainerId })
            console.log db.get('container')


needsUpgrade = (expectedId, cb) ->
  git.long (id) ->
    cb(id isnt expectedId, id)

buildNewImage = (cb) ->
  console.log "building new image \n"
  tarStream = tar.pack(process.cwd())
  docker.buildImage(tarStream, {t: 'blog'}, (error,output) ->
    imageId = ""
    output.on('data', (data) ->
      imageId = JSON.parse(data.toString()).stream.split(' ').slice(-1)[0].trim()
      console.log JSON.parse(data.toString()).stream.trim()
    )
    output.on('end', ->
      cb(imageId)
    )
  )

stopOldContainer = (id, cb) ->
  unless id? then return cb()
  container = docker.getContainer(id)
  container.stop (err, data) ->
    if err
      console.log "Couldn't stop old container"
      process.exit()
    else
      cb()

startNewContainer = (cb) ->
  docker.createContainer {
    Image: 'blog'
    ExposedPorts: '80/tcp'
  }, (err, container) ->
    container.start {
      PortBindings:
        "80/tcp": [{ HostPort: '80' }]
    }, (err, data) ->
      if err
        console.log "Couldn't start new container"
        console.log err
        process.exit()

      console.log "new container is started"
      console.log container
      cb(container.id)
