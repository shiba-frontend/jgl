import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlashScreen from "./component/flashscreen/FlashScreen";
import { useSelector, useDispatch } from "react-redux";

//Auth
import SignUp from "./component/auth/SignUp";
import Login from "./component/customer/auth/Login";
import LoginNews from "./component/newspaper/auth/Login";
import Otp from "./component/auth/Otp";
import ForgotPassword from "./component/auth/ForgotPassword";
import ResetPassword from "./component/auth/ResetPassword";


//End Auth
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
import AddBusiness from "./component/businessowner/businesslisting/AddBusiness";
import DealsListing from "./component/businessowner/Deals/DealsListing";
import BusinessListing from "./component/businessowner/businesslisting/BusinessListing";
import DeleteListing from "./component/businessowner/businesslisting/DeleteListing";
import ReviewList from "./component/businessowner/profile/ReviewList";
import ReviewListcustomer from "./component/customer/profile/ReviewList";
import AddDeal from "./component/businessowner/Deals/AddDeal";
import Analytics from "./component/businessowner/analytics/Analytics";
import CustomerList from "./component/businessowner/dashboard/CustomerList";
import MyOrder from "./component/businessowner/order/MyOrder";
import NotFound from "./component/NotFound";
import SignUpOtp from "./component/auth/SignUpOtp";
import PublicRoute from "./common/PublicRoute";
import PrivateRoute from "./common/PrivateRoute";
import EditCategory from "./component/newspaper/newscategory/EditCategory";
import PaymentCard from "./component/businessowner/Deals/PaymentCard";
import SubCategoryList from "./component/newspaper/newscategory/SubCategoryList";
import AddSubCategory from "./component/newspaper/newscategory/AddSubCategory";
import EditSubCategory from "./component/newspaper/newscategory/EditSubCategory";
import ArticlesList from "./component/newspaper/political/ArticlesList";
import EditArticle from "./component/newspaper/political/EditArticle";
import AnalyticleDetails from "./component/newspaper/newsanalytics/AnalyticleDetails";
import Home from "./component/customer/home/Home";
import EditDeal from "./component/businessowner/Deals/EditDeal";
import Payment from "./component/customer/checkprocess/Payment";
import OrderDetails from "./component/customer/deal/OrderDetails";
import CategoryArticle from "./component/customer/home/CategoryArticle";

//End Profile



function App() {

  var token = useSelector((state) => state.accessToken);
  var token = localStorage.getItem('accessToken');


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
      <Route path="*" element={<NotFound />} />
   <Route element={<PublicRoute />}> 
          
            <Route path="/" element={<Login />} />
            <Route path="/login-customer" element={<Login />} />
            <Route path="/login-newspaper" element={<LoginNews />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />     
            <Route path="/otp" element={<Otp />} />
            <Route path="/signup-otp" element={<SignUpOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
     </Route> 
           <Route element={<PrivateRoute />}> 
           <Route path="/home" element={<Home />} />
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


        
            <Route path="/news-category" element={<NewsCategoryList />} />
            <Route path="/news-sub-category" element={<SubCategoryList />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/add-sub-category" element={<AddSubCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />
            <Route path="/edit-sub-category/:id" element={<EditSubCategory />} />
            <Route path="/deal" element={<  Deals />} />
            <Route path="/my-deal" element={<MyDeal />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/news-details/:id" element={<NewsDetails />} />
            <Route path="/business" element={<Business />} />
            <Route path="/business-details/:id" element={<BusinessDetails />} />
            <Route path="/home-article" element={<CategoryArticle />} />
            <Route path="/my-checked-in" element={<MyCheckedIn />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/check-out" element={<CheckOut />} />
            <Route path="/payment-deal" element={<Payment />} />
            <Route path="/news-analytics" element={<NewsAnalyticsList />} />
            <Route path="/news-articles" element={<ArticlesList />} />
            <Route path="/article-details" element={<PoliticalNewsArticle />} />
            <Route path="/add-articles" element={<AddArticles />} />
            <Route path="/article-details/:id" element={<EditArticle />} />
            <Route path="/analyticle-details/:id" element={<AnalyticleDetails />} />
            {/* Business Owner */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-business" element={<AddBusiness />} />
            <Route path="/deal-listing" element={<DealsListing />} />
            <Route path="/business-listing" element={<BusinessListing />} />
            <Route path="/delete-listing" element={<DeleteListing />} />
            <Route path="/add-deal" element={<AddDeal />} />
            <Route path="/edit-deal/:id" element={<EditDeal />} />
            <Route path="/review-list" element={<ReviewList />} />
            <Route path="/customer-review-list" element={<ReviewListcustomer />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/customer-list" element={<CustomerList />} />
            <Route path="/my-order" element={<MyOrder />} />
            <Route path="/payment" element={<PaymentCard />} />
          </Route> 
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
