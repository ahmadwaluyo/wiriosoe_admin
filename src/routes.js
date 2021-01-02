import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import DataSantri from "./views/DataSantri";
import DataUser from "./views/DataUser";
import BlogPosts from "./views/BlogPosts";
import LoginPage from "./views/Login/login";
import ProductKoperasi from "./views/Product";
import DetailProduct from "./views/DetailProduct";
import StudentProfile from "./views/UserProfileLite";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/dashboard",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/login",
    layout: LoginPage
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/data-santri",
    layout: DefaultLayout,
    component: DataSantri
  },
  {
    path: "/data-user",
    layout: DefaultLayout,
    component: DataUser
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/product-koperasi",
    layout: DefaultLayout,
    component: ProductKoperasi
  },
  {
    path: "/student-profile",
    layout: DefaultLayout,
    component: StudentProfile
  },
  {
    path: "/id_product/:id",
    layout: DefaultLayout,
    component: DetailProduct
  },
];
