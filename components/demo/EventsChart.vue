<template>
  <div>
    <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow col-span-2 lg:col-span-1">
      <div class="bg-white px-4 py-3 border-b border-gray-200 sm:px-6 flex flex-row justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Demo Events by Day</h3>
      </div>
      <client-only>
        <query-renderer :cubejs-api="cubejsApi" :query="query">
          <template #default="{ resultSet }">

            <div class="chart-renderer" style="height: 400px" v-if="resultSet">
              <component
                  v-if="componentType"
                  :is="componentType"
                  :data="data(resultSet)"
                  :stacked="isStacked"
                  height="400px"
              ></component>

              <div
                  v-if="chartType === 'number'"
                  class="number-container"
                  style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              flex-direction: column;
            "
              >
                <div
                    v-for="item in resultSet.series()"
                    :key="item.key"
                    style="font-size: 24px"
                >
                  {{ item.series[0].value }}
                </div>
              </div>
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

    query() {
      return {
        "measures": [
          "EventsGood.count"
        ],
        "timeDimensions": [
          {
            "dimension": "EventsGood.eventTime",
            "granularity": "day",
            "dateRange": [
              this.dateStart,
              this.dateEnd
            ]
          }
        ],
        "order": {
          "EventsGood.eventTime": "asc"
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