import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingScreen  from"./pages/Loading.js"
import {SnackBarProvider} from "./SnackContext.js";
import NavBar from "./containers/NavBar.js";
import ReactGA from "react-ga4";

const Home  = lazy(() => import( "./pages/home/Home.js"));
const FullImage = lazy(() => import( './pages/gallery/FullImage.js'));
const Gallery  = lazy(() => import("./pages/gallery/Gallery.js"))
const Explore = lazy(() => import("./pages/explore/Explore.js"));

const AuthProvider  = lazy(() => import("./AuthContext.js").then((module)=>({default: module.AuthProvider})))
const Search = lazy(() => import("./pages/explore/Search.js"));
const VerifiedRoute  = lazy(() => import("./pages/auth/VerifiedRoute.js"))
const Collection = lazy(() => import("./pages/profile/Collection.js"));
const NotVerified = lazy(() => import("./pages/auth/NotVerified.js"));
const Login = lazy(() => import("./pages/auth/Auth"));
const Feedback = lazy(() => import("./pages/Contact.js"));
const NoPage = lazy(() => import("./pages/NoPage"));


export default function App() {
  ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID)
  
  return (
    <SnackBarProvider>
      <AuthProvider>
      <BrowserRouter>
      <NavBar 
      >
      <Suspense fallback={<LoadingScreen/>}>
        <Routes basename='/index.html'>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/gallery" element={<Gallery/>}/>
          <Route exact path="/explore" element={<Explore  />}/>
          <Route exact path="/explore/:tag" element={
                        <VerifiedRoute>
                        <Search/>
                        </VerifiedRoute>
          }/>
          <Route path="/login" element={<Login/>}/>
          <Route exact path="/profile/collection" element={
              <VerifiedRoute>
              <Collection />
              </VerifiedRoute>
        }/>
          <Route exact path="/gallery/:url" element={<FullImage/>}/>
          <Route exact  path="/contact" element={<Feedback/>} />
          <Route path="/email-not-verified" element={<NotVerified/>}/>
          <Route path="*" element={<NoPage />} status={404} />
        </Routes>
      </Suspense>
      </NavBar>
        </BrowserRouter>
      <Suspense fallback={<LoadingScreen/>}>
      </Suspense>
      </AuthProvider>
    </SnackBarProvider>
  )
}