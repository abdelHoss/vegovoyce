import router from "@/router";

const changeRoute = (link, keyword, category) => {
  router.push({
    path: link,
    query: { keyword, category },
  });
};

export default changeRoute;
