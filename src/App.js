import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlashScreen from "./component/flashscreen/FlashScreen";

//Auth
import SignUp from "./component/customer/auth/SignUp";
import Login from "./component/customer/auth/Login";
import LoginNews from "./component/newspaper/auth/Login";
import Otp from "./component/customer/auth/Otp";
import OtpNews from "./component/newspaper/auth/Otp";
import ForgotPassword from "./component/customer/auth/ForgotPassword";
import ForgotPasswordNews from "./component/newspaper/auth/ForgotPassword";
import ResetPassword from "./component/customer/auth/ResetPassword";
import ResetPasswordNews from "./component/newspaper/auth/ResetPassword";

//End Auth


import Home from "./component/customer/home/Home";
import MyDeal from "./component/customer/deal/MyDeal";
import NewsDetails from "./component/customer/home/NewsDetails";
import Business from "./component/customer/business/Business";
import BusinessDetails from "./component/customer/business/BusinessDetails";
import Cart from "./component/customer/checkprocess/Cart";
import Deals from "./component/customer/deal/Deals";
import MyCheckedIn from "./component/customer/deal/MyCheckedIn";
import CheckOut from "./component/customer/checkprocess/CheckOut";
import NewsAnalyticsList from "./component/newspaper/newsanalytics/NewsAnalyticsList";
import NewsCategoryList from "./component/newspaper/newscategory/NewsCategoryList";
import AddCategory from "./component/newspaper/newscategory/AddCategory";
import PoliticalNewsArticle from "./component/newspaper/political/PoliticalNewsArticle";
import AddArticles from "./component/newspaper/political/AddArticles";
import Dashboard from "./component/businessowner/dashboard/Dashboard";
// Sidebar Menu

import NavMenu from "./component/customer/header/NavMenu";
import NavMenuNews from "./component/newspaper/header/NavMenu";
import NavMenuBusiness from "./component/businessowner/header/NavMenu";

//End


// Cms
import PrivacyPolicy from "./component/customer/cms/PrivacyPolicy";
import PrivacyPolicyNews from "./component/newspaper/cms/PrivacyPolicy";
import PrivacyPolicyBusiness from "./component/businessowner/cms/PrivacyPolicy";

import TermsCondition from "./component/customer/cms/TermsCondition";
import TermsConditionNews from "./component/newspaper/cms/TermsCondition";
import TermsConditionBusiness from "./component/businessowner/cms/TermsCondition";

import ContactUs from "./component/customer/cms/ContactUs";
import ContactUsNews from "./component/newspaper/cms/ContactUs";
import ContactUsBusiness from "./component/businessowner/cms/ContactUs";

import About from "./component/customer/cms/About";
import AboutNews from "./component/newspaper/cms/About";
import AboutBusiness from "./component/businessowner/cms/About";

import UserAgreement from "./component/customer/cms/UserAgreement";
import UserAgreementNews from "./component/newspaper/cms/UserAgreement";
import UserAgreementBusiness from "./component/businessowner/cms/UserAgreement";
//End cms

//Profile 
import ChangePassword from "./component/customer/profile/ChangePassword";
import ChangePasswordNews from "./component/newspaper/profile/ChangePassword";
import ChangePasswordBusiness from "./component/businessowner/profile/ChangePassword";
import UpdateProfile from "./component/customer/profile/UpdateProfile";
import UpdateProfileNews from "./component/newspaper/profile/UpdateProfile";
import UpdateProfileBusiness from "./component/businessowner/profile/UpdateProfile";
import DeleteAccount from "./component/customer/profile/DeleteAccount";
import DeleteAccountBusiness from "./component/businessowner/profile/DeleteAccount";

//End Profile



function App() {

  var token = "sdd"

  return (
    <div className="App">
      <BrowserRouter>
      {token &&
      <><NavMenu/>
      <NavMenuNews/>
      <NavMenuBusiness/>
      </>
      
    }
      <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login-customer" element={<Login />} />
            <Route path="/login-newspaper" element={<LoginNews />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/newspaper-forgot-password" element={<ForgotPasswordNews />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/newspaper-otp" element={<OtpNews />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/newspaper-reset-password" element={<ResetPasswordNews />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/newspaper-privacy-policy" element={<PrivacyPolicyNews />} />
            <Route path="/business-privacy-policy" element={<PrivacyPolicyBusiness />} />
            <Route path="/terms-condition" element={<TermsCondition />} />
            <Route path="/newspaper-terms-condition" element={<TermsConditionNews />} />
            <Route path="/business-terms-condition" element={<TermsConditionBusiness />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/newspaper-about-us" element={<AboutNews />} />
            <Route path="/business-about-us" element={<AboutBusiness />} />
            <Route path="/user-agreement" element={<UserAgreement />} />
            <Route path="/newspaper-user-agreement" element={<UserAgreementNews />} />
            <Route path="/business-user-agreement" element={<UserAgreementBusiness/>} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/newspaper-contact-us" element={<ContactUsNews />} />
            <Route path="/business-contact-us" element={<ContactUsBusiness />} />

            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/newspaper-change-password" element={<ChangePasswordNews />} />
            <Route path="/business-change-password" element={<ChangePasswordBusiness />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/newspaper-update-profile" element={<UpdateProfileNews />} />
            <Route path="/business-update-profile" element={<UpdateProfileBusiness />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/business-delete-account" element={<DeleteAccountBusiness />} />


            <Route path="/home" element={<Home />} />
            <Route path="/news-category" element={<NewsCategoryList />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/deal" element={<Deals />} />
            <Route path="/my-deal" element={<MyDeal />} />
            <Route path="/news-details" element={<NewsDetails />} />
            <Route path="/business" element={<Business />} />
            <Route path="/business-details/:id" element={<BusinessDetails />} />
            <Route path="/my-checked-in" element={<MyCheckedIn />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/check-out" element={<CheckOut />} />
            <Route path="/news-analytics" element={<NewsAnalyticsList />} />
            <Route path="/political-news" element={<PoliticalNewsArticle />} />
            <Route path="/add-articles" element={<AddArticles />} />
            <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
