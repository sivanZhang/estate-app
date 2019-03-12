export const filtersMixin = {
  filters: {
    FDate(val) {
      let arr = new Date(val).toDateString().split(/\s/g);
      return `${arr[2]} ${arr[1]}`;
    },
    FTime(val) {
      return new Date(val).toLocaleTimeString();
    }
  }
}