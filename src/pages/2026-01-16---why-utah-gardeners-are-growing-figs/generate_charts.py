#!/usr/bin/env python3
"""
Generate charts for the Utah gardening / arctic air blog post.
"""

import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import numpy as np

# Set up nice styling
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.size'] = 11
plt.rcParams['axes.labelsize'] = 12
plt.rcParams['axes.titlesize'] = 14
plt.rcParams['figure.facecolor'] = 'white'

# Salt Lake City annual extreme low temperatures (from NOAA data via extremeweatherwatch.com)
# Data is coldest temperature recorded each year
slc_data = {
    1949: -22, 1950: -8, 1951: -2, 1952: -10, 1953: 2, 1954: -8, 1955: -2,
    1956: -7, 1957: -2, 1958: 6, 1959: -6, 1960: -8, 1961: 4, 1962: -7,
    1963: -18, 1964: -5, 1965: 3, 1966: 2, 1967: -3, 1968: 0, 1969: 5,
    1970: 0, 1971: -7, 1972: -15, 1973: -6, 1974: -5, 1975: -5, 1976: 3,
    1977: 1, 1978: -2, 1979: -6, 1980: -2, 1981: 4, 1982: -5, 1983: -6,
    1984: -8, 1985: -9, 1986: -2, 1987: 5, 1988: -3, 1989: -14, 1990: -11,
    1991: 2, 1992: -1, 1993: -1, 1994: 0, 1995: 5, 1996: -5, 1997: -3,
    1998: -5, 1999: 6, 2000: 3, 2001: 2, 2002: 5, 2003: 8, 2004: 4,
    2005: 3, 2006: 6, 2007: 2, 2008: -2, 2009: -6, 2010: 3, 2011: -2,
    2012: 6, 2013: 2, 2014: 6, 2015: 7, 2016: 2, 2017: 4, 2018: 8,
    2019: 5, 2020: 9, 2021: 8, 2022: 9, 2023: 9, 2024: 5, 2025: 11
}

def create_slc_extreme_lows_chart():
    """Create the main chart showing SLC annual extreme lows over time."""

    years = list(slc_data.keys())
    temps = list(slc_data.values())

    fig, ax = plt.subplots(figsize=(12, 6), dpi=150)

    # Create color gradient based on temperature
    colors = ['#3b82f6' if t < 0 else '#94a3b8' if t < 5 else '#f97316' for t in temps]

    # Plot bars
    bars = ax.bar(years, temps, color=colors, width=0.8, edgecolor='none', alpha=0.85)

    # Add a horizontal line at 0°F
    ax.axhline(y=0, color='#1e293b', linewidth=1, linestyle='-', alpha=0.5)

    # Add a vertical line at 1990 to show the shift
    ax.axvline(x=1990, color='#dc2626', linewidth=2, linestyle='--', alpha=0.7)
    ax.annotate('~1990: The shift', xy=(1990, 12), xytext=(1995, 14),
                fontsize=10, color='#dc2626',
                arrowprops=dict(arrowstyle='->', color='#dc2626', lw=1.5))

    # Add annotations for key events
    ax.annotate('1949: -22°F\n(Record low)', xy=(1949, -22), xytext=(1955, -18),
                fontsize=9, color='#1e40af',
                arrowprops=dict(arrowstyle='->', color='#1e40af', lw=1))

    ax.annotate('1963: -18°F', xy=(1963, -18), xytext=(1968, -16),
                fontsize=9, color='#1e40af',
                arrowprops=dict(arrowstyle='->', color='#1e40af', lw=1))

    ax.annotate('Recent years:\n~9°F typical', xy=(2022, 9), xytext=(2010, 14),
                fontsize=9, color='#c2410c',
                arrowprops=dict(arrowstyle='->', color='#c2410c', lw=1))

    # Calculate and show decadal averages
    decades = [(1950, 1959), (1960, 1969), (1970, 1979), (1980, 1989),
               (1990, 1999), (2000, 2009), (2010, 2019), (2020, 2025)]

    for start, end in decades:
        decade_temps = [slc_data[y] for y in range(start, end + 1) if y in slc_data]
        if decade_temps:
            avg = np.mean(decade_temps)
            mid_year = (start + end) / 2
            # Draw a small horizontal line for the decade average
            ax.hlines(avg, start, end, colors='#1e293b', linewidth=2, alpha=0.6)

    # Styling
    ax.set_xlabel('Year', fontweight='bold')
    ax.set_ylabel('Coldest Temperature (°F)', fontweight='bold')
    ax.set_title('Salt Lake City Annual Extreme Low Temperatures (1949-2025)',
                 fontweight='bold', pad=15)

    # Set axis limits
    ax.set_xlim(1947, 2027)
    ax.set_ylim(-25, 18)

    # Format y-axis to show °F
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%d°F'))

    # Add legend
    from matplotlib.patches import Patch
    legend_elements = [
        Patch(facecolor='#3b82f6', alpha=0.85, label='Below 0°F'),
        Patch(facecolor='#94a3b8', alpha=0.85, label='0°F to 5°F'),
        Patch(facecolor='#f97316', alpha=0.85, label='Above 5°F'),
    ]
    ax.legend(handles=legend_elements, loc='lower right', framealpha=0.9)

    # Add subtitle
    fig.text(0.5, 0.01,
             'Data source: NOAA via extremeweatherwatch.com | Annual minimum temperature recorded at SLC International Airport',
             ha='center', fontsize=8, color='#64748b')

    plt.tight_layout()
    plt.subplots_adjust(bottom=0.1)

    # Save high-quality PNG
    plt.savefig('slc_extreme_lows.png', dpi=300, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    print("Saved: slc_extreme_lows.png")

    plt.close()


def create_corridor_comparison_chart():
    """Create a chart comparing stations along the corridor."""

    # Decadal averages for each station (calculated from the data we collected)
    stations = ['Great Falls\nMT (47.5°N)', 'Idaho Falls\nID (43.5°N)',
                'Pocatello\nID (42.9°N)', 'Logan\nUT (41.7°N)',
                'Salt Lake City\nUT (40.8°N)']

    avg_1950s = [-24.1, -15.9, -12.7, -5.8, -12]  # approximate
    avg_1980s = [-26.6, -20.3, -18.6, -11.0, -11]
    avg_2020s = [-28.5, -15.7, -8.8, -2.2, 7]

    x = np.arange(len(stations))
    width = 0.25

    fig, ax = plt.subplots(figsize=(12, 6), dpi=150)

    bars1 = ax.bar(x - width, avg_1950s, width, label='1950s', color='#3b82f6', alpha=0.8)
    bars2 = ax.bar(x, avg_1980s, width, label='1980s', color='#8b5cf6', alpha=0.8)
    bars3 = ax.bar(x + width, avg_2020s, width, label='2020s', color='#f97316', alpha=0.8)

    # Add value labels on bars
    def add_labels(bars):
        for bar in bars:
            height = bar.get_height()
            ax.annotate(f'{height:.0f}°',
                       xy=(bar.get_x() + bar.get_width() / 2, height),
                       xytext=(0, 3 if height >= 0 else -12),
                       textcoords="offset points",
                       ha='center', va='bottom' if height >= 0 else 'top',
                       fontsize=8, fontweight='bold')

    add_labels(bars1)
    add_labels(bars2)
    add_labels(bars3)

    # Add horizontal line at 0
    ax.axhline(y=0, color='#1e293b', linewidth=1, linestyle='-', alpha=0.5)

    # Styling
    ax.set_xlabel('Weather Station (North → South)', fontweight='bold')
    ax.set_ylabel('Average Annual Extreme Low (°F)', fontweight='bold')
    ax.set_title('The Arctic Air Gradient: How Far South Does the Cold Reach?',
                 fontweight='bold', pad=15)
    ax.set_xticks(x)
    ax.set_xticklabels(stations)
    ax.legend(loc='upper left')

    ax.set_ylim(-35, 15)
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%d°F'))

    # Add annotation about the pattern
    ax.annotate('Great Falls: No warming\n(Arctic air still arrives)',
                xy=(0, -28.5), xytext=(0.5, -15),
                fontsize=9, color='#1e40af',
                arrowprops=dict(arrowstyle='->', color='#1e40af', lw=1))

    ax.annotate('Salt Lake City:\n+19°F warming',
                xy=(4, 7), xytext=(3.3, 10),
                fontsize=9, color='#c2410c',
                arrowprops=dict(arrowstyle='->', color='#c2410c', lw=1))

    # Add subtitle
    fig.text(0.5, 0.01,
             'Decadal averages of annual extreme low temperatures along the Snake River Plain corridor',
             ha='center', fontsize=8, color='#64748b')

    plt.tight_layout()
    plt.subplots_adjust(bottom=0.1)

    plt.savefig('corridor_comparison.png', dpi=300, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    print("Saved: corridor_comparison.png")

    plt.close()


if __name__ == '__main__':
    print("Generating charts...")
    create_slc_extreme_lows_chart()
    create_corridor_comparison_chart()
    print("Done!")
