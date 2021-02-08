import { Moment } from 'moment';

export function sameMoment(moment: Moment | null) {
  return {
    /*
     * The asymmetricMatch function is required, and must return a boolean.
     */
    asymmetricMatch: function (m: Moment | null) {
      if (moment == null && m == null) return true;
      if (moment != null && m == null) return false;
      return m!.isSame(moment);
    },

    /*
     * The jasmineToString method is used in the Jasmine pretty printer, and will
     * be seen by the user in the message when a test fails.
     */
    jasmineToString: function () {
      return `<sameMoment: ${moment?.format()}>`;
    },
  };
}
