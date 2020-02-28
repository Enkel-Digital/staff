// Import AuthType Enum
import AuthType from "./AuthType";

/** @notice Pre-Load all components for frequently used routes */
import HomeComponent from "@/views/Home.vue";
import FormComponent from "@/views/Form.vue";
import TeamComponent from "@/views/Team.vue";

/**
 * @notice Some of these lesser used routes uses lazy loading for the components
 *
 * route level code-splitting
 * this generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 */
const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeComponent,
    meta: { Auth_requirements: AuthType.private }
  },
  {
    path: "/team",
    name: "team",
    component: TeamComponent,
    meta: { Auth_requirements: AuthType.private }
  },
  {
    path: "/form",
    name: "form",
    component: FormComponent,
    meta: { Auth_requirements: AuthType.private }
  },
  {
    path: "/report-issue",
    name: "report-issue",
    component: () => import("@/views/ReportIssue.vue"),
    meta: { Auth_requirements: AuthType.private }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    meta: { Auth_requirements: AuthType.private }
  },
  {
    path: "/history",
    name: "history",
    component: () => import("@/views/History.vue"),
    meta: { Auth_requirements: AuthType.private }
  }
];

export default routes;
