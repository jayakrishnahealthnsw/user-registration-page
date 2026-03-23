import { RouterProvider, createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/Landing";
import { HomePage } from "./pages/Home";
import { SelectProviderPage } from "./pages/SelectProvider";
import { YourDetailsPage } from "./pages/YourDetails";
import { ProfessionalPage } from "./pages/Professional";
import { PracticePage } from "./pages/Practice";
import { SecurityPage } from "./pages/Security";
import { VerifyEmailPage } from "./pages/VerifyEmail";
import { SuccessPage } from "./pages/Success";
import { ForgotPasswordPage } from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/register",
    Component: HomePage,
  },
  {
    path: "/select-provider",
    Component: SelectProviderPage,
  },
  {
    path: "/register/your-details",
    Component: YourDetailsPage,
  },
  {
    path: "/register/professional",
    Component: ProfessionalPage,
  },
  {
    path: "/register/practice",
    Component: PracticePage,
  },
  {
    path: "/register/security",
    Component: SecurityPage,
  },
  {
    path: "/register/verify-email",
    Component: VerifyEmailPage,
  },
  {
    path: "/register/success",
    Component: SuccessPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
