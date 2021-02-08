export default function (options) {
  if (options.store.getters.isLoggedIn) {
    console.log("logged in ");
  } else {
    console.log("not logged in ");
    if (options.route.path !== "/") {
      console.log("options.from ", options.from);
      console.log("options.route ", options.route);
      options.redirect("/");
    }
  }
}
