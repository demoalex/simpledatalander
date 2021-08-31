<template>
  <div>
    <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow col-span-2 lg:col-span-1">
      <div class="bg-white px-4 py-3 border-b border-gray-200 sm:px-6 flex flex-row justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Demo Events Count</h3>
      </div>
      <client-only>
        <query-renderer :cubejs-api="cubejsApi" :query="queryTable">
          <template #default="{ resultSet }">
            <div class="chart-renderer" v-if="resultSet">
              <table class="table-auto w-full">
                <thead>
                  <tr>
                    <th class="border-b border-l border-r px-4 py-2 font-medium">Event</th>
                    <th class="border-b border-l border-r px-4 py-2 font-medium">Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, $index) in pairs(resultSet)" :key="$index">
                    <td class="border px-4 py-2 font-medium">
                      {{ item[0] }}
                    </td>
                    <td class="border px-4 py-2 font-medium">
                      {{ item[1] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </query-renderer>
      </client-only>
    </div>
  </div>
</template>

<script>
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/vue";

export default {
  name: "Events",
  data() {
    return {
      cubejsApi: cubejs(this.$config.cubeJsToken, {
        apiUrl: this.$config.cubeJsApiUrl
      }),
      chartType: 'bar',
      pivotConfig: {
        "x": [
          "EventsGood.eventTime.week"
        ],
        "y": [
          "EventsGood.title",
          "measures"
        ],
        "fillMissingDates": true,
        "joinDateRange": false
      }
    };
  },

  components: {
    QueryRenderer
  },
  computed: {
    componentType() {
      if (this.chartType === 'table' || this.chartType === 'number') {
        return null;
      }

      return [this.chartType === 'bar' ? 'column' : this.chartType, '-chart'].join('');
    },

    isStacked() {
      return this.chartType === 'area' || this.chartType === 'bar';
    },

    dateStart() {
      const date = new Date()
      date.setDate(date.getDate() - 6)
      return this.formatDate(date)
    },

    dateEnd() {
      return this.formatDate(new Date())
    },

    queryTable() {
      return {
        "measures": [
          "EventsGood.count"
        ],
            "timeDimensions": [
          {
            "dimension": "EventsGood.eventTime",
            "dateRange": [
              this.dateStart,
              this.dateEnd
            ]
          }
        ],
        "order": {
          "EventsGood.count": "desc"
        },
        "dimensions": [
          "EventsGood.title"
        ]
      }
    }
  },
  methods: {
    formatDate(date) {
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return [year, month, day].join('-')
    },

    data(resultSet) {
      if (['line', 'area'].includes(this.chartType)) {
        return this.series(resultSet);
      }

      if (this.chartType === 'pie') {
        return this.pairs(resultSet);
      }

      if (this.chartType === 'bar') {
        return this.seriesPairs(resultSet);
      }
    },

    series(resultSet) {
      if (!resultSet) {
        return [];
      }

      const seriesNames = resultSet.seriesNames();
      const pivot = resultSet.chartPivot();
      const series = [];
      seriesNames.forEach(e => {
        const data = pivot.map(p => [p.x, p[e.key]]);
        series.push({
          name: e.title,
          data
        });
      });
      return series;
    },

    pairs(resultSet) {
      return resultSet.series()[0].series.map(item => [item.x, item.value]);
    },

    seriesPairs(resultSet) {
      return resultSet.series().map(seriesItem => ({
        name: seriesItem.title,
        data: seriesItem.series.map(item => [this.formatDate(new Date(item.x)), item.value]),
      }));
    }

  }
};</script>