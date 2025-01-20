//Import Mixpanel SDK
import mixpanel from "mixpanel-browser";

// Near entry of your product, init Mixpanel
export default function initializeMixpanel() {
  mixpanel.init("87ce4777213c995bb9f22760be1e19c1", {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
}
