import mixpanel from "mixpanel-browser";

function useMixpanel() {
  function mixpanelLogin(username, email, id) {
    mixpanelPeopleSet(username, email);
    mixpanelIdentify(id);
  }

  function mixpanelPeopleSet(username, email) {
    mixpanel.people.set({
      $name: username,
      $email: email,
      plan: "Premium",
    });
  }

  function mixpanelIdentify(id) {
    mixpanel.track(id);
  }

  function mixpanelTrack(event) {
    mixpanel.track(event);
  }

  return { mixpanelTrack, mixpanelLogin };
}

export default useMixpanel;
