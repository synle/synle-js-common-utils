import moment from 'moment';

const DateUtils = {
  formatDate(dateObject: Date | string): string {
    return moment(dateObject).format('L'); // 02/19/2020
  },
  formatDateTime(dateObject: Date | string): string {
    return moment(dateObject).format('LLL'); // September 4 1986 8:30 PM
  },
  formatTime(dateObject: Date | string): string {
    return moment(dateObject).format('LT'); // 10:46 AM
  },
  relative(dateObject: Date | string): string {
    return moment(dateObject).fromNow(); // 11 hours ago
  },
  parseDate(dateAsString: Date | string): Date {
    return moment(dateAsString).toDate(); // date object
  },
  getEpoch(dateAsString: Date | string): number {
    return moment(dateAsString).unix();
  },
  dateSorterAsc(propertyName) {
    return (a: Date | string, b: Date | string) => {
      const aEpoch = DateUtils.getEpoch(a[propertyName] || a);
      const bEpoch = DateUtils.getEpoch(b[propertyName] || b);
      if (aEpoch < bEpoch) return -1;
      if (aEpoch > bEpoch) return 1;
      return 0;
    };
  },
  dateSorterDesc(propertyName) {
    return (a: Date | string, b: Date | string) => {
      const aEpoch = DateUtils.getEpoch(a[propertyName] || a);
      const bEpoch = DateUtils.getEpoch(b[propertyName] || b);
      if (aEpoch < bEpoch) return 1;
      if (aEpoch > bEpoch) return -1;
      return 0;
    };
  },
};

export default DateUtils;
