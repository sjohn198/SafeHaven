import Cookies from "js-cookie"

function addAuthHeader(otherHeaders = {}) {
    const token = Cookies.get('safeHavenToken');
    if (token === undefined) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }
export {addAuthHeader};