import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ContentAppPage from './pages/ContentPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UserActivityPage from './pages/UserActivity';
import ChecklistPage from './pages/ChecklistPage';
import EbookPage from './pages/EbookPage';
import CaseStudiesPage from './pages/caseStudiesPage';
import InfoGraphicsPage from './pages/infoGraphicsPage';
import AddUser from './pages/AddUser';
import ProfilePage from './pages/ProfilePage';
import CreateBlog from './pages/AddBlog';
import CategoriesPage from './pages/CategoriesPage';
import SubCategoriesPage from './pages/SubCategoriesPage';
import CommentPage from './pages/CommentPage';
import HomePageContent from './pages/ContentPage/HomePageContent';
import NavbarContent from './pages/ContentPage/NavbarContent';
import FooterPageContent from './pages/ContentPage/FooterPageContent';
import ServicePageContent from './pages/ContentPage/ServicePageContent';
import ContactPageContent from './pages/ContentPage/ContactPageContent';
import IndustriesPageContent from './pages/ContentPage/IndustriesPageContent';
import CaseStudiesPageContent from './pages/ContentPage/CaseStudiesPageContent';
import InfoGraphicsPageContent from './pages/ContentPage/InfoGraphicsPageContent';
import ChecklistPageContent from './pages/ContentPage/ChecklistPageContent';
import FAQPageContent from './pages/ContentPage/FAQPageContent';
import BlogPageContent from './pages/ContentPage/BlogPageContent';
import PartnerPageContent from './pages/ContentPage/PartnerPageContent';
import CarrierApplyPageContent from './pages/ContentPage/CarrierApplyPageContent';
import CarrierPageContent from './pages/ContentPage/CarrierPageContent';
import OurStoryPageContent from './pages/ContentPage/OurStoryPageContent';
import EbookPageContent from './pages/ContentPage/EbookPageContent';
import ContactPage from './pages/ContactPage';
import NavbarPageContent from './pages/ContentPage/NavbarPageContent';
import CarrierPage from './pages/CarrierPage';
import AddCarrier from './pages/AddCarrier';
import CandidatePage from './pages/CandidatePage';
import CreateInfographics from './pages/AddInfographics';
import Createcasestudies from './pages/AddCasestudies';
import Createchecklist from './pages/AddChecklist';
import Createebook from './pages/AddEbook';
import ServiceList from './pages/ServicesList';
import IndustriesList from './pages/IndustryList';
import AccountPayAndReceivablesService from './pages/ContentPage/Services/AccountPayAndReceivablesService';
import BankReconciliationServices from './pages/ContentPage/Services/BankReconciliationServices';
import BookkepingServices from './pages/ContentPage/Services/BookkepingServices';
import CardReconciliationServices from './pages/ContentPage/Services/CardReconciliationServices';
import CustomerAndVenderReconciliationService from './pages/ContentPage/Services/CustomerAndVenderReconciliationService';
import FinancialStatmentPreparationServices from './pages/ContentPage/Services/FinancialStatmentPreparationServices';
import PayrollReconciliationServices from './pages/ContentPage/Services/PayrollReconciliationServices';
import VirtualAccountingServices from './pages/ContentPage/Services/VirtualAccountingServices';
import PayrollServices from './pages/ContentPage/Services/PayrollServices';
import ClinicsAccounting from './pages/ContentPage/Industries/ClinicsAccounting';
import LandscapingAccounting from './pages/ContentPage/Industries/LandscapingAccounting';
import LawfirmAccounting from './pages/ContentPage/Industries/LawfirmAccounting';
import RentalServicesAccounting from './pages/ContentPage/Industries/RentalServicesAccounting';
import RestaurantAccounting from './pages/ContentPage/Industries/RestaurantAccounting';
import FeaturedBlog from './pages/FeaturedBlog';
import ActivityCardList from './pages/ActivityCardList';
import BpartnerContact from './pages/BpartnerContact';
import ResetPassword from './pages/ResetPassword';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'pages', element: <ContentAppPage /> },
        // { path: 'pages/navbar', element: <NavbarContent /> },
        { path: 'pages/footer', element: <FooterPageContent /> },
        { path: 'pages/industries', element: <IndustriesList /> },
        { path: 'pages/industries/ClinicsAccounting', element: <ClinicsAccounting /> },
        { path: 'pages/industries/LandscapingAccounting', element: <LandscapingAccounting /> },
        { path: 'pages/industries/LawfirmAccounting', element: <LawfirmAccounting /> },
        { path: 'pages/industries/RentalServicesAccounting', element: <RentalServicesAccounting /> },
        { path: 'pages/industries/RestaurantAccounting', element: <RestaurantAccounting /> },
        { path: 'pages/contact', element: <ContactPageContent /> },
        { path: 'pages/home', element: <HomePageContent /> },

        { path: 'pages/service', element: <ServiceList /> },
        { path: 'pages/service/AccountPayAndReceivablesService', element: <AccountPayAndReceivablesService /> },
        { path: 'pages/service/BankReconciliationServices', element: <BankReconciliationServices /> },
        { path: 'pages/service/BookkepingServices', element: <BookkepingServices /> },
        { path: 'pages/service/CardReconciliationServices', element: <CardReconciliationServices /> },
        {
          path: 'pages/service/CustomerAndVenderReconciliationService',
          element: <CustomerAndVenderReconciliationService />,
        },
        {
          path: 'pages/service/FinancialStatmentPreparationServices',
          element: <FinancialStatmentPreparationServices />,
        },
        { path: 'pages/service/PayrollReconciliationServices', element: <PayrollReconciliationServices /> },
        { path: 'pages/service/PayrollServices', element: <PayrollServices /> },
        { path: 'pages/service/VirtualAccountingServices', element: <VirtualAccountingServices /> },

        { path: 'pages/casestudy', element: <CaseStudiesPageContent /> },
        { path: 'pages/infographics', element: <InfoGraphicsPageContent /> },
        { path: 'pages/checklist', element: <ChecklistPageContent /> },
        { path: 'pages/faq', element: <FAQPageContent /> },
        { path: 'pages/blog', element: <BlogPageContent /> },
        { path: 'pages/partner', element: <PartnerPageContent /> },
        { path: 'pages/carrierapply', element: <CarrierApplyPageContent /> },
        { path: 'pages/carrier', element: <CarrierPageContent /> },
        { path: 'pages/ourstory', element: <OurStoryPageContent /> },
        { path: 'pages/ebook', element: <EbookPageContent /> },
        { path: 'pages/navbar', element: <NavbarPageContent /> },
        { path: 'pages', element: <ContentAppPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'featured/blog', element: <FeaturedBlog /> },
        { path: 'activity', element: <ActivityCardList /> },
        { path: 'become-our-partner-list', element: <BpartnerContact /> },
        { path: 'activity/:id', element: <UserActivityPage /> },
        { path: 'checklist', element: <ChecklistPage /> },
        { path: 'ebook', element: <EbookPage /> },
        { path: 'adduser', element: <AddUser /> },
        { path: 'addblog', element: <CreateBlog /> },
        { path: 'casestudies', element: <CaseStudiesPage /> },
        { path: 'infographics', element: <InfoGraphicsPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'category', element: <CategoriesPage /> },
        { path: 'subcategory', element: <SubCategoriesPage /> },
        { path: 'edit/:id', element: <CreateBlog /> },
        { path: 'comments', element: <CommentPage /> },
        { path: 'feedback', element: <ContactPage /> },
        { path: 'carrier', element: <CarrierPage /> },
        { path: 'carrier/new', element: <AddCarrier /> },
        { path: 'carrier/edit/:id', element: <AddCarrier /> },
        { path: 'carrier/candidate/:id', element: <CandidatePage /> },
        { path: 'user/edit/:id', element: <AddUser /> },
        { path: 'infographics/add', element: <CreateInfographics /> },
        { path: 'infographics/edit/:id', element: <CreateInfographics /> },
        { path: 'casestudies/add', element: <Createcasestudies /> },
        { path: 'casestudies/edit/:id', element: <Createcasestudies /> },
        { path: 'checklist/add', element: <Createchecklist /> },
        { path: 'checklist/edit/:id', element: <Createchecklist /> },
        { path: 'ebook/add', element: <Createebook /> },
        { path: 'ebook/edit/:id', element: <Createebook /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'password/reset/:token',
      element: <ResetPassword />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
