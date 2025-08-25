import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
/// Css
import './../index.css'
import './../chart.css'
import './../step.css'

/// Layout
import Nav from './../layouts/nav'
import Footer from './../layouts/Footer'

import { ThemeContext } from "../../context/ThemeContext";
//Scroll To Top
import ScrollToTop from './../layouts/ScrollToTop';

/// Dashboard
import Home from "./../pages/dashboard/Home";
import Dashboard2 from "./../pages/dashboard/Dashboard2";
import Dashboard3 from "./../pages/dashboard/Dashboard3";
import EmptyPage from "./../pages/dashboard/EmptyPage";

//Event 
import EventManagement from "./../pages/dashboard/EventManagement";

//Professor
import AllProfessor from './../pages/professors/AllProfessor';
import AddProfessor from './../pages/professors/AddProfessor';
import EditProfessor from './../pages/professors/EditProfessor';
import ProfileProfessor from './../pages/professors/ProfileProfessor';


//Inventory
import Inventory from "../pages/Inventory/Inventory";

//Student
import AllStudent from './../pages/students/AllStudent';
import AddStudent from './../pages/students/AddStudent';
import EditStudent from './../pages/students/EditStudent';
import AboutStudent from './../pages/students/AboutStudent';

//Course
import AllCourses from './../pages/courses/AllCourses';
import AddCourses from './../pages/courses/AddCourses';
import EditCourses from './../pages/courses/EditCourses';
import AboutCourses from './../pages/courses/AboutCourses';

//library
import AllLibrary from './../pages/library/AllLibrary';
import AddLibrary from './../pages/library/AddLibrary';
import EditLibrary from './../pages/library/EditLibrary';

//Department
import AllDepartments from './../pages/departments/AllDepartments';
import AddDepartments from './../pages/departments/AddDepartments';
import EditDepartments from './../pages/departments/EditDepartments';

//Staff
import AllStaff from './../pages/staff/AllStaff';
import AddStaff from './../pages/staff/AddStaff';
import EditStaff from './../pages/staff/EditStaff';
import ProfileStaff from './../pages/staff/ProfileStaff';

//holidays
import AllHoliday from './../pages/holidays/AllHoliday';
import AddHoliday from './../pages/holidays/AddHoliday';
import EditHoliday from './../pages/holidays/EditHoliday';
import HolidayEvent from './../pages/holidays/HolidayEvent';


//Fees
import FeeCollection from './../pages/fees/FeeCollection';
import AddFees from './../pages/fees/AddFees';
import FeesReceipt from './../pages/fees/FeesReceipt';

/// App
import AppProfile from './../pages/apps/AppProfile'
import PostDetails from './../pages/apps/PostDetails'
import EditProfile from "../pages/apps/EditProfile";
import Calendar from './../pages/apps/Calendar/Calendar'
import Compose from './../pages/email/Compose/Compose'
import Inbox from './../pages/email/Inbox/Inbox'
import Read from './../pages/email/Read'

//CMS
import Content from './../pages/cms/Content';
import Menu from './../pages/cms/Menu';
import EmailTemplate from './../pages/cms/EmailTemplate';
import CmsBlog from './../pages/cms/Blog';
import ContentAdd from './../pages/cms/ContentAdd';
import AddMail from './../pages/cms/AddMail';
import AddBlog from './../pages/cms/AddBlog';
import BlogCategory from './../pages/cms/BlogCategory';

/// Product List
import ProductGrid from './../pages/ecommerce/ProductGrid/ProductGrid'
import ProductList from './../pages/ecommerce/ProductList/ProductList'
import ProductDetail from './../pages/ecommerce/ProductGrid/ProductDetail'
import Checkout from './../pages/ecommerce/Checkout'
import EcomCustomers from './../pages/ecommerce/Customers'
import Invoice from './../pages/ecommerce/Invoice'
import ProductOrder from './../pages/ecommerce/ProductOrder'

/// Charts
import RechartJs from './../pages/charts/rechart'
import ChartJs from './../pages/charts/Chartjs'
import SparklineChart from './../pages/charts/Sparkline'
import ApexChart from './../pages/charts/apexcharts'

/// Bootstrap
import UiAlert from "./../pages/bootstrap/Alert";
import UiAccordion from "./../pages/bootstrap/Accordion";
import UiBadge from "./../pages/bootstrap/Badge";
import UiButton from "./../pages/bootstrap/Button";
import UiModal from "./../pages/bootstrap/Modal";
import UiButtonGroup from "./../pages/bootstrap/ButtonGroup";
import UiListGroup from "./../pages/bootstrap/ListGroup";
import MediaObject from "./../pages/bootstrap/MediaObject";
import UiCards from "./../pages/bootstrap/Cards";
import UiCarousel from "./../pages/bootstrap/Carousel";
import UiDropDown from "./../pages/bootstrap/DropDown";
import UiPopOver from "./../pages/bootstrap/PopOver";
import UiProgressBar from "./../pages/bootstrap/ProgressBar";
import UiTab from "./../pages/bootstrap/Tab";
import UiPagination from "./../pages/bootstrap/Pagination";
import UiGrid from "./../pages/bootstrap/Grid";
import UiTypography from "./../pages/bootstrap/Typography";

/// Plugins
import Select2 from "./../pages/plugins/Select2/Select2";
import MainSweetAlert from "./../pages/plugins/SweetAlert";
import Toastr from "./../pages/plugins/Toastr";
import Lightgallery from "./../pages/plugins/Lightgallery";


/// Widget
import WidgetCard from "./../pages/widget/WidgetCard";
import WidgetChart from "./../pages/widget/WidgetChart";
import WidgetList from "./../pages/widget/WidgetList";


/// Table
import DataTable from './../pages/table/DataTable'
import BootstrapTable from './../pages/table/BootstrapTable'
import SortingTable from "./../pages/table/SortingTable/SortingTable";
import FilteringTable from "./../pages/table/FilteringTable/FilteringTable";


/// Form
import Element from "./../pages/forms/Element/Element";
import Wizard from "./../pages/forms/Wizard/Wizard";
import Pickers from "./../pages/forms/Pickers/Pickers";
import CkEditor from './../pages/forms/CkEditor/CkEditor';
import FormValidation from './../pages/forms/FormValidation/FormValidation';

/// Pages
import LockScreen from './../pages/error/LockScreen'
import Error400 from './../pages/error/Error400'
import Error403 from './../pages/error/Error403'
import Error404 from './../pages/error/Error404'
import Error500 from './../pages/error/Error500'
import Error503 from './../pages/error/Error503'
import { components } from "react-select";
import Addons from "../pages/Addons/Addons";
import AllOrders from "../pages/Orders/AllOrders";
import ScheduledOrder from "../pages/Orders/ScheduledOrder";
import EmployeeRole from "../pages/Employee/EployeeRole";
import AddEmployee from "../pages/Employee/AddEmployee";
import EmployeeList from "../pages/Employee/EmployeeList";
import Brands from "../pages/Brands/Brands";
import OldCategories from "../pages/OldCategories/OldCategories";
import OldSubCategories from "../pages/OldCategories/OldSubCategories";
import Categories from "../pages/Categories/Categories";
import SubCategories from "../pages/Categories/SubCategories";
import SubSubCategories from "../pages/Categories/SubSubCategories";
import FittingSize from "../pages/FittingSize/FittingSize";
import Threads from "../pages/Threads/Threads";
import Materials from "../pages/Materials/Materials";
import Variants from "../pages/Variants/Variants";
import AddProduct from "../pages/Products/AddNewProduct";
import AllProductList from "../pages/Products/ProductList";

import EditProductData from "../pages/Products/EditProductData";

import Parts from "../pages/Parts/Parts";
import AllSupplierList from "../pages/Supplier/SupplierList";
import AddNewSupplier from "../pages/Supplier/AddNewSupplier";
import EditSupplier from "../pages/Supplier/EditSupplier";
import AddSupplierPurchaseOrder from "../pages/PurchaseOrder/AddPurchaseOrder";
import SupplierPurchaseOrderList from "../pages/PurchaseOrder/PurchaseOrderList";
import PurchaseOrderView from "../pages/PurchaseOrder/PurchaseOrderView";
import VerifyPurchaseOrder from "../pages/PurchaseOrder/VerifyPurchaseOrder";
import ReturnOrdersLits from "../pages/PurchaseOrder/ReturnOrdersLits";
import ReturnOrderView from "../pages/PurchaseOrder/ReturnOrderView";
import BillView from "../pages/PurchaseOrder/BillView";
import BulkImport from "../pages/Products/BulkImport";
import Design from "../pages/Design/Design";
import FittingThreads from "../pages/FittingThreads/FittingThreads";
import HoseDashSize from "../pages/HoseDashSize/HoseDashSize";
import FittingDashSize from "../pages/FittingDashSize/FittingDashSize";
import BendAngle from "../pages/BendAngle/BendAngle";
import BrandLayLine from "../pages/BrandLayLine/BrandLayLine";
import HoseType from "../pages/HoseType/HoseType";
import AddCustomer from "../pages/Customer/AddCustomer";
import CustomerList from "../pages/Customer/CustomerList";
import AddSalesOrder from "../pages/SalesOrder/AddSalesOrder";
import SaleOrderList from "../pages/SalesOrder/SaleOrderList";
import SaleOrderView from "../pages/SalesOrder/SaleOrderView";
import VerifySaleOrder from "../pages/SalesOrder/VerifySaleOrder";
import ProductionManagement from "../pages/ProductionManagement/ProductionManagement";
import ProductDetailsQR from "../pages/authentication/productDetails";
import AuthorizeSaleOrder from "../pages/SalesOrder/AuthorizeSaleOrder";
import EditSaleOrder from "../pages/SalesOrder/EditSaleOrder";
import ProductionSheetList from "../pages/ProductionManagement/ProductionSheetList";
import ProducitonSheetView from "../pages/ProductionManagement/ProducitonSheetView";
import ProductionProcess from "../pages/ProductionProcessManagement/ProductionProcess";
import LogActivity from "../pages/ProductionProcessManagement/ActivityLogs/LogActivity";
import AddOperator from "../pages/Operators/AddOperator";
import OperatorsList from "../pages/Operators/OperatorsList";
import ProductionProcessPendingList from "../pages/ProductionProcessManagement/ProductionProcessList/ProductionProcessPendingList";
import ProductionProcessInProgressList from "../pages/ProductionProcessManagement/ProductionProcessList/ProductionProcessInProgressList";
import ProductionProcessCompletedList from "../pages/ProductionProcessManagement/ProductionProcessList/ProductionProcessCompletedList";
import StoreHome from "../pages/StoreManagement/StoreHome";
import StoreSaleOrdersLits from "../pages/StoreManagement/StoreComponents/StoreSaleOrdersLits";
import AssignQuantityForSaleOrder from "../pages/StoreManagement/StoreComponents/AssignQuantityForSaleOrder";
import StoreSaleOrderView from "../pages/StoreManagement/StoreComponents/StoreSaleOrderView";
import StoreInventoryRejectionList from "../pages/StoreManagement/StoreComponents/StoreInventoryRejectionList";
import RejectedItems from "../pages/StoreManagement/StoreComponents/RejectedItems";
import StockJournal from "../pages/StockJournal/stockJournal";
import StorePackingApprovalList from "../pages/StoreManagement/StoreComponents/PackingApproval/StorePackingApprovalList";
import StorePackingApprovalitems from "../pages/StoreManagement/StoreComponents/PackingApproval/StorePackingApprovalitems";
import PackingRequestList from "../pages/PackingManagement/PackingRequestList";
import GatePassRequestList from "../pages/GatePassManagement/GatePassRequestList";
import PackingItems from "../pages/PackingManagement/PackingItems";
import GatePassItems from "../pages/GatePassManagement/GatePassItems";

// import Todo from './pages/Todo';


const Markup = () => {
  const allroutes = [
    /// Dashboard
    { url: "", component: <Home /> },
    { url: "/productqr/:id", component: <ProductDetailsQR /> },


    { url: "dashboard", component: <Home /> },
    { url: "dashboard/restaurant", component: <Dashboard2 /> },

    { url: "index-2", component: <Dashboard2 /> },
    { url: "index-3", component: <Dashboard3 /> },
    { url: "event-management", component: <EventManagement /> },


    //Inventory
    { url: 'inventory', component: <Inventory /> },

    //Customer
    { url: 'add-customer', component: <AddCustomer /> },
    { url: 'customer-list', component: <CustomerList /> },

     //Opertors
    { url: 'add-operator', component: <AddOperator /> },
    { url: 'operator-list', component: <OperatorsList /> },

    //sales Order
    { url: 'add-sales-order', component: <AddSalesOrder /> },
    { url: 'sales-order-list', component: <SaleOrderList /> },
    { url: 'saleorderview/:id', component: <SaleOrderView /> },
    { url: 'verifysSaleOrder/:id', component: <VerifySaleOrder /> },
    { url: 'authorizeSaleOrder/:id', component: <AuthorizeSaleOrder /> },
    { url: 'edit-sale-order/:id', component: <EditSaleOrder /> },
    // edit-sale-order


    //Brands
    { url: 'brands', component: <Brands /> },
    { url: 'categories', component: <Categories /> },
    { url: 'subcategories', component: <SubCategories /> },
    { url: 'subsubcategories', component: <SubSubCategories /> },

    { url: 'fittingsize', component: <FittingSize /> },
    { url: 'threads', component: <Threads /> },
    { url: 'materials', component: <Materials /> },
    { url: 'variants', component: <Variants /> },
    { url: 'parts', component: <Parts /> },

    // Design
    { url: 'design', component: <Design /> },
    // fittingthreads
    { url: 'fittingthreads', component: <FittingThreads /> },
    // HoseDashSize
    { url: 'hosedashsize', component: <HoseDashSize /> },
    // fittingdashsize
    { url: 'fittingdashsize', component: <FittingDashSize /> },
    // Bend Angle
    { url: 'bendangle', component: <BendAngle /> },
    // Brand Lay Line
    { url: 'brandlayline', component: <BrandLayLine /> },
    // Brand Lay Line
    { url: 'hosetype', component: <HoseType /> },


    // Products
    { url: 'addnewproduct', component: <AddProduct /> },
    { url: 'productlist', component: <AllProductList /> },
    { url: 'editproductdata/:id', component: <EditProductData /> },
    { url: 'bulkimport', component: <BulkImport /> },
    //BulkImport

    // Supplier
    { url: 'addnewsupplier', component: <AddNewSupplier /> },
    { url: 'supplierlist', component: <AllSupplierList /> },
    { url: 'editsupplierdata/:id', component: <EditSupplier /> },

    // Purchase Order
    { url: 'addnewpurchaseorder', component: <AddSupplierPurchaseOrder /> },
    { url: 'purchaseorderlist', component: <SupplierPurchaseOrderList /> },
    { url: 'purchaseorderview/:id', component: <PurchaseOrderView /> },
    { url: 'verifyPurchaseOrder/:id', component: <VerifyPurchaseOrder /> },
    { url: 'billview/:id', component: <BillView /> },

    // Production Management
    { url: 'production-sheet', component: <ProductionManagement /> },
    { url: 'production-sheet-list', component: <ProductionSheetList /> },
    { url: 'production-sheet-view/:id', component: <ProducitonSheetView /> },


    // Store Management
    { url: 'store', component: <StoreHome /> },
    { url: '/store/saleorders', component: <StoreSaleOrdersLits /> },
    { url: 'storeSaleRrderView/:id', component: <StoreSaleOrderView /> },
    { url: 'assign-quantity/:id', component: <AssignQuantityForSaleOrder /> },
    
    { url: '/store/rejection-query', component: <StoreInventoryRejectionList /> },
    { url: 'storeRejectionView/:id', component: <StoreSaleOrderView /> },
    { url: 'rejected-items/:id', component: <RejectedItems /> },

    //stock-journal Stock Journal
    { url: 'stock-journal', component: <StockJournal /> },


    //packing
    
    { url: '/packing', component: <PackingRequestList /> },
    { url: '/pack-items/:id', component: <PackingItems /> },
    
    { url: '/store/packing-approval', component: <StorePackingApprovalList /> },
    { url: 'packing-items/:id', component: <StorePackingApprovalitems /> },



   //GatePass 
    { url: '/gate-pass', component: <GatePassRequestList /> },
    { url: '/gatePass-items/:id', component: <GatePassItems /> },
    { url: '/gatePass-view/:id', component: <PackingItems /> },


    //production-process

    { url: 'production-process', component: <ProductionProcess /> },
    { url: 'production-process-log-activity/:id', component: <LogActivity /> },

    // Returns Order View
    { url: 'returnorderview/:id', component: <ReturnOrderView /> },
    { url: 'returnorders', component: <ReturnOrdersLits /> },
    { url: 'production-process-pending', component: <ProductionProcessPendingList /> },
    { url: 'production-process-in-progress', component: <ProductionProcessInProgressList /> },
    { url: 'production-process-completed', component: <ProductionProcessCompletedList /> },

    //Food Mangment
    { url: 'category', component: <OldCategories /> },
    { url: 'sub-category', component: <OldSubCategories /> },



    //Orders
    { url: 'all/orders', component: <AllOrders /> },
    { url: 'scheduled/orders', component: <ScheduledOrder /> },

    //employees
    { url: 'employee-role', component: <EmployeeRole /> },
    { url: 'add-new-employee', component: <AddEmployee /> },
    { url: 'employee/list', component: <EmployeeList /> },





    /// Shop
    { url: "ecom-product-grid", component: <ProductGrid /> },
    { url: "ecom-product-list", component: <ProductList /> },
    { url: "ecom-product-detail", component: <ProductDetail /> },
    { url: "ecom-product-order", component: <ProductOrder /> },
    { url: "ecom-checkout", component: <Checkout /> },
    { url: "ecom-invoice", component: <Invoice /> },
    { url: "ecom-customers", component: <EcomCustomers /> },


    //Professors
    { url: "all-professors", component: <AllProfessor /> },
    { url: "add-professor", component: <AddProfessor /> },
    { url: "edit-professor", component: <EditProfessor /> },
    { url: "professor-profile", component: <ProfileProfessor /> },

    //Student
    { url: "all-students", component: <AllStudent /> },
    { url: "add-student", component: <AddStudent /> },
    { url: "edit-student", component: <EditStudent /> },
    { url: "about-student", component: <AboutStudent /> },

    //Course
    { url: "all-courses", component: <AllCourses /> },
    { url: "add-courses", component: <AddCourses /> },
    { url: "edit-courses", component: <EditCourses /> },
    { url: "about-courses", component: <AboutCourses /> },

    //Library
    { url: "all-library", component: <AllLibrary /> },
    { url: "Add-library", component: <AddLibrary /> },
    { url: "edit-library", component: <EditLibrary /> },

    //Department
    { url: "All-departments", component: <AllDepartments /> },
    { url: "add-departments", component: <AddDepartments /> },
    { url: "edit-departments", component: <EditDepartments /> },


    //Staff
    { url: "all-staff", component: <AllStaff /> },
    { url: "add-staff", component: <AddStaff /> },
    { url: "edit-staff", component: <EditStaff /> },
    { url: "staff-profile", component: <ProfileStaff /> },

    //Holiday
    { url: "all-holiday", component: <AllHoliday /> },
    { url: "add-holiday", component: <AddHoliday /> },
    { url: "edit-holiday", component: <EditHoliday /> },
    { url: "holiday-calendar", component: <HolidayEvent /> },

    //fees
    { url: "fees-collection", component: <FeeCollection /> },
    { url: "add-fees", component: <AddFees /> },
    { url: "fees-receipt", component: <FeesReceipt /> },



    /// Apps
    { url: "app-profile", component: <AppProfile /> },
    { url: "post-details", component: <PostDetails /> },
    { url: "edit-profile", component: <EditProfile /> },
    { url: "email-compose", component: <Compose /> },
    { url: "email-inbox", component: <Inbox /> },
    { url: "email-read", component: <Read /> },
    { url: "app-calender", component: <Calendar /> },

    ///Cms
    { url: 'content', component: <Content /> },
    { url: 'menu', component: <Menu /> },
    { url: 'email-template', component: <EmailTemplate /> },
    { url: 'blog', component: <CmsBlog /> },
    { url: 'content-add', component: <ContentAdd /> },
    { url: 'add-email', component: <AddMail /> },
    { url: 'add-blog', component: <AddBlog /> },
    { url: 'blog-category', component: <BlogCategory /> },


    /// Chart
    { url: "chart-sparkline", component: <SparklineChart /> },
    { url: "chart-chartjs", component: <ChartJs /> },
    { url: "chart-apexchart", component: <ApexChart /> },
    { url: "chart-rechart", component: <RechartJs /> },

    /// Bootstrap
    { url: "ui-accordion", component: <UiAccordion /> },
    { url: "ui-alert", component: <UiAlert /> },
    { url: "ui-badge", component: <UiBadge /> },
    { url: "ui-button", component: <UiButton /> },
    { url: "ui-modal", component: <UiModal /> },
    { url: "ui-button-group", component: <UiButtonGroup /> },
    { url: "ui-list-group", component: <UiListGroup /> },
    { url: "ui-media-object", component: <MediaObject /> },
    { url: "ui-card", component: <UiCards /> },
    { url: "ui-carousel", component: <UiCarousel /> },
    { url: "ui-dropdown", component: <UiDropDown /> },
    { url: "ui-popover", component: <UiPopOver /> },
    { url: "ui-progressbar", component: <UiProgressBar /> },
    { url: "ui-tab", component: <UiTab /> },
    { url: "ui-pagination", component: <UiPagination /> },
    { url: "ui-typography", component: <UiTypography /> },
    { url: "ui-grid", component: <UiGrid /> },

    /// Plugin

    { url: "uc-select2", component: <Select2 /> },
    { url: "uc-sweetalert", component: <MainSweetAlert /> },
    { url: "uc-toastr", component: <Toastr /> },
    // { url: "map-jqvmap", component: <JqvMap /> },
    { url: "uc-lightgallery", component: <Lightgallery /> },

    /// Widget
    { url: "widget-card", component: <WidgetCard /> },
    { url: "widget-chart", component: <WidgetChart /> },
    { url: "widget-list", component: <WidgetList /> },

    // Form
    { url: "form-element", component: <Element /> },
    { url: "form-wizard", component: <Wizard /> },
    { url: "form-ckeditor", component: <CkEditor /> },
    { url: "form-pickers", component: <Pickers /> },
    { url: "form-validation", component: <FormValidation /> },


    /// table	
    { url: "table-datatable-basic", component: <DataTable /> },
    { url: 'table-filtering', component: <FilteringTable /> },
    { url: 'table-sorting', component: <SortingTable /> },
    { url: "table-bootstrap-basic", component: <BootstrapTable /> },

    /// pages    
    { url: "empty", component: <EmptyPage /> },
    // { url: 'todo', component: <Todo/> },
  ]


  function NotFound() {
    const url = allroutes.map((route) => route.url);
    let path = window.location.pathname
    path = path.split('/')
    path = path[path.length - 1]

    if (url.indexOf(path) <= 0) {
      return <Error404 />
    }
  }

  return (
    <>
      <Routes>
        <Route path='/page-lock-screen' element={<LockScreen />} />
        <Route path='/page-error-400' element={<Error400 />} />
        <Route path='/page-error-403' element={<Error403 />} />
        <Route path='/page-error-404' element={<Error404 />} />
        <Route path='/page-error-500' element={<Error500 />} />
        <Route path='/page-error-503' element={<Error503 />} />
        <Route element={<MainLayout />} >
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </>
  )
}

function MainLayout() {
  const { sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);
  return (
    <>
      <div id="main-wrapper" className={`show  ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}>
        <Nav />
        <div className="content-body" >
          <div className="container-fluid" style={{ minHeight: window.screen.height - 45 }}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
};

export default Markup;