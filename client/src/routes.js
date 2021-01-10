import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import AnimeStats from "./views/AnimeStats";
import SeasonStats from "./views/SeasonStats";
import AnimeIndustry from "./views/AnimeIndustry";
import UserProfileLite from "./views/UserProfileLite";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/home" />
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/anime-stats",
    layout: DefaultLayout,
    component: AnimeStats
  },
  {
    path: "/season-stats",
    layout: DefaultLayout,
    component: SeasonStats
  },
  {
    path: "/anime-industry",
    layout: DefaultLayout,
    component: AnimeIndustry
  }
  ,
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfileLite
  }
];
