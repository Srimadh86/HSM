const multer = require('multer');
module.exports = app =>{
    const Country = require('../controllers/country.controller');
    const Masters = require('../controllers/masters.controller');
    const upload = require('../middleware/upload');
    var router = require("express").Router();

    router.get('/masters/list',Masters.list); 
    router.post('/masters/uploadexcel',upload.single('excel'),Masters.uploadExcel);
    router.post('/masters/masteruploadexcel',upload.single('excel'),Masters.MasterUploadExcel);
    router.post('/masters/hostmenutransaction',upload.single('excel'),Masters.SecondTransactionTable);
    router.post('/masters/compstorerestdatatransaction',upload.single('excel'),Masters.ThirdTransactionTable);
    router.post('/masters/compstoremenudatatransaction',upload.single('excel'),Masters.LastTransactionTable);

    router.get('/countries/list',Country.list); 
    router.post('/countries/add',Country.add);  
    router.post('/countries/edit/:id',Country.edit);
    router.get('/countries/view/:id',Country.view);  
    router.get('/countries/delete/:id',Country.delete); 

    const State = require('../controllers/state.controller');
    router.get('/states/list',State.list);
    router.post('/states/add',State.add);
    router.get('/states/view/:id',State.view);
    router.post('/states/edit/:id',State.edit);
    router.get('/states/delete/:id',State.delete);
    router.get('/states/listbyregion/:id',State.listbyregion)

    const Region = require('../controllers/region.controller');
    router.post('/regions/add',Region.add);
    router.get('/regions/list',Region.list);
    router.get('/regions/view/:id',Region.view);
    router.post('/regions/edit/:id',Region.edit);
    router.get('/regions/delete/:id',Region.delete);
    router.get('/regions/listbycountry/:id',Region.listbycountry);

    const ConceptMaster = require('../controllers/conceptmaster.controller');
    router.get('/conceptmasters/list',ConceptMaster.list);
    router.post('/conceptmasters/add',ConceptMaster.add);
    router.get('/conceptmasters/view/:id',ConceptMaster.view);
    router.post('/conceptmasters/edit/:id',ConceptMaster.edit);
    router.get('/conceptmasters/delete/:id',ConceptMaster.delete);
    router.post('/conceptmasters/uploadexcel',upload.single('excel'),ConceptMaster.uploadExcel);

    const RevenueTypeMaster = require('../controllers/revenuetypemaster.controller');
    router.get('/revenuetypemasters/list',RevenueTypeMaster.list);
    router.post('/revenuetypemasters/add',RevenueTypeMaster.add);
    router.get('/revenuetypemasters/view/:id',RevenueTypeMaster.view);
    router.post('/revenuetypemasters/edit/:id',RevenueTypeMaster.edit);
    router.get('/revenuetypemasters/delete/:id',RevenueTypeMaster.delete);
    router.post('/revenuetypemasters/uploadexcel',upload.single('excel'),RevenueTypeMaster.uploadRevenueExcel);

    const DefSeqMaster = require('../controllers/defsequencemaster.controller');
    router.get('/defseqmasters/list',DefSeqMaster.list);
    router.post('/defseqmasters/add',DefSeqMaster.add);
    router.get('/defseqmasters/view/:id',DefSeqMaster.view);
    router.post('/defseqmasters/edit/:id',DefSeqMaster.edit);
    router.get('/defseqmasters/delete/:id',DefSeqMaster.delete);
    router.post('/defseqmasters/uploadexcel',upload.single('excel'),DefSeqMaster.uploadExcel);

    const MajorGroupMaster = require('../controllers/majorgroupmaster.controller');
    router.get('/majorgroupmasters/list',MajorGroupMaster.list);
    router.post('/majorgroupmasters/add',MajorGroupMaster.add);
    router.get('/majorgroupmasters/view/:id',MajorGroupMaster.view);
    router.post('/majorgroupmasters/edit/:id',MajorGroupMaster.edit);
    router.get('/majorgroupmasters/delete/:id',MajorGroupMaster.delete);
    router.post('/majorgroupmasters/uploadexcel',upload.single('excel'),MajorGroupMaster.uploadExcel);

    const Pricelevel = require('../controllers/pricelevelmaster.controller');
    router.get('/pricelevelmasters/list',Pricelevel.list);
    router.post('/pricelevelmasters/add',Pricelevel.add);
    router.get('/pricelevelmasters/view/:id',Pricelevel.view);
    router.post('/pricelevelmasters/edit/:id',Pricelevel.edit);
    router.get('/pricelevelmasters/delete/:id',Pricelevel.delete);
    router.post('/pricelevelmasters/uploadexcel',upload.single('excel'),Pricelevel.uploadExcel);

    const Pricenumber = require('../controllers/pricenumbermaster.controller');
    router.get('/pricenumbermasters/list',Pricenumber.list);
    router.post('/pricenumbermasters/add',Pricenumber.add);
    router.get('/pricenumbermasters/view/:id',Pricenumber.view);
    router.post('/pricenumbermasters/edit/:id',Pricenumber.edit);
    router.get('/pricenumbermasters/delete/:id',Pricenumber.delete);
    router.post('/pricenumbermasters/uploadexcel',upload.single('excel'),Pricenumber.uploadExcel);

    const Menucategory = require('../controllers/menucategorymaster.controller');
    router.get('/menucategories/list',Menucategory.list);
    router.post('/menucategories/add',Menucategory.add);
    router.get('/menucategories/view/:id',Menucategory.view);
    router.post('/menucategories/edit/:id',Menucategory.edit);
    router.get('/menucategories/delete/:id',Menucategory.delete);
    router.post('/menucategories/uploadexcel',upload.single('excel'),Menucategory.uploadExcel);

    const ModelRounding = require('../controllers/roundingmaster.controller');
    router.get('/roundingmasters/list',ModelRounding.list);
    router.post('/roundingmasters/add',ModelRounding.add);
    router.get('/roundingmasters/view/:id',ModelRounding.view);
    router.post('/roundingmasters/edit/:id',ModelRounding.edit);
    router.get('/roundingmasters/delete/:id',ModelRounding.delete);
    router.post('/roundingmasters/uploadexcel',upload.single('excel'),ModelRounding.uploadExcel);


    const StoreStyleMaster = require('../controllers/compstorestylemaster.controller');
    router.get('/storestylemasters/list',StoreStyleMaster.list);
    router.post('/storestylemasters/add',StoreStyleMaster.add);
    router.get('/storestylemasters/view/:id',StoreStyleMaster.view);
    router.post('/storestylemasters/edit/:id',StoreStyleMaster.edit);
    router.get('/storestylemasters/delete/:id',StoreStyleMaster.delete);
    router.post('/storestylemasters/uploadexcel',upload.single('excel'),StoreStyleMaster.uploadExcel);


    const StoreAlcoholStatusMasters = require('../controllers/storealcoholstatusmaster.controller');
    router.get('/storeasmasters/list',StoreAlcoholStatusMasters.list);
    router.post('/storeasmasters/add',StoreAlcoholStatusMasters.add);
    router.get('/storeasmasters/view/:id',StoreAlcoholStatusMasters.view);
    router.post('/storeasmasters/edit/:id',StoreAlcoholStatusMasters.edit);
    router.get('/storeasmasters/delete/:id',StoreAlcoholStatusMasters.delete);
    router.post('/storeasmasters/uploadexcel',upload.single('excel'),StoreAlcoholStatusMasters.uploadExcel);

    const StoreTakeoutMasters = require('../controllers/storetakeoutmaster.controller');
    router.get('/storetakeoutmasters/list',StoreTakeoutMasters.list);
    router.post('/storetakeoutmasters/add',StoreTakeoutMasters.add);
    router.get('/storetakeoutmasters/view/:id',StoreTakeoutMasters.view);
    router.post('/storetakeoutmasters/edit/:id',StoreTakeoutMasters.edit);
    router.get('/storetakeoutmasters/delete/:id',StoreTakeoutMasters.delete);
    router.post('/storetakeoutmasters/uploadexcel',upload.single('excel'),StoreTakeoutMasters.uploadExcel);

    const StoreWaiterServiceMasters = require('../controllers/storewaiterservicemaster.controller');
    router.get('/storewaiterservicemasters/list',StoreWaiterServiceMasters.list);
    router.post('/storewaiterservicemasters/add',StoreWaiterServiceMasters.add);
    router.get('/storewaiterservicemasters/view/:id',StoreWaiterServiceMasters.view);
    router.post('/storewaiterservicemasters/edit/:id',StoreWaiterServiceMasters.edit);
    router.get('/storewaiterservicemasters/delete/:id',StoreWaiterServiceMasters.delete);
    router.post('/storewaiterservicemasters/uploadexcel',upload.single('excel'),StoreWaiterServiceMasters.uploadExcel);


    const StoreCaterMasters = require('../controllers/storecatersmaster.controller');
    router.get('/storecatermasters/list',StoreCaterMasters.list);
    router.post('/storecatermasters/add',StoreCaterMasters.add);
    router.get('/storecatermasters/view/:id',StoreCaterMasters.view);
    router.post('/storecatermasters/edit/:id',StoreCaterMasters.edit);
    router.get('/storecatermasters/delete/:id',StoreCaterMasters.delete);
    router.post('/storecatermasters/uploadexcel',upload.single('excel'),StoreCaterMasters.uploadExcel);

    const StoreRestaurantMasters = require('../controllers/storerestaurantmaster.controller');
    router.get('/storerestmasters/list',StoreRestaurantMasters.list);
    router.post('/storerestmasters/add',StoreRestaurantMasters.add);
    router.get('/storerestmasters/view/:id',StoreRestaurantMasters.view);
    router.post('/storerestmasters/edit/:id',StoreRestaurantMasters.edit);
    router.get('/storerestmasters/delete/:id',StoreRestaurantMasters.delete);
    router.post('/storerestmasters/uploadexcel',upload.single('excel'),StoreRestaurantMasters.uploadExcel);

    const StoreSectionMasters = require('../controllers/storesectionmaster.controller');
    router.get('/storesectionmasters/list',StoreSectionMasters.list);
    router.post('/storesectionmasters/add',StoreSectionMasters.add);
    router.get('/storesectionmasters/view/:id',StoreSectionMasters.view);
    router.post('/storesectionmasters/edit/:id',StoreSectionMasters.edit);
    router.get('/storesectionmasters/delete/:id',StoreSectionMasters.delete);
    router.post('/storesectionmasters/uploadexcel',upload.single('excel'),StoreSectionMasters.uploadExcel);

    const StoreGroupCountMasters = require('../controllers/storegroupcountmaster.controller');
    router.get('/storegroupcountmasters/list',StoreGroupCountMasters.list);
    router.post('/storegroupcountmasters/add',StoreGroupCountMasters.add);
    router.get('/storegroupcountmasters/view/:id',StoreGroupCountMasters.view);
    router.post('/storegroupcountmasters/edit/:id',StoreGroupCountMasters.edit);
    router.get('/storegroupcountmasters/delete/:id',StoreGroupCountMasters.delete);
    router.post('/storegroupcountmasters/uploadexcel',upload.single('excel'),StoreGroupCountMasters.uploadExcel);

    const StoreRatingRangeMaster = require('../controllers/storeratingrangemaster.controller');
    router.get('/storeratingrangemasters/list',StoreRatingRangeMaster.list);
    router.post('/storeratingrangemasters/add',StoreRatingRangeMaster.add);
    router.get('/storeratingrangemasters/view/:id',StoreRatingRangeMaster.view);
    router.post('/storeratingrangemasters/edit/:id',StoreRatingRangeMaster.edit);
    router.get('/storeratingrangemasters/delete/:id',StoreRatingRangeMaster.delete);
    router.post('/storeratingrangemasters/uploadexcel',upload.single('excel'),StoreRatingRangeMaster.uploadExcel);

    const StorePriceSegmentMaster = require('../controllers/storeratingrangemaster.controller');
    router.get('/storepricesegmentmasters/list',StorePriceSegmentMaster.list);
    router.post('/storepricesegmentmasters/add',StorePriceSegmentMaster.add);
    router.get('/storepricesegmentmasters/view/:id',StorePriceSegmentMaster.view);
    router.post('/storepricesegmentmasters/edit/:id',StorePriceSegmentMaster.edit);
    router.get('/storepricesegmentmasters/delete/:id',StorePriceSegmentMaster.delete);
    router.post('/storepricesegmentmasters/uploadexcel',upload.single('excel'),StorePriceSegmentMaster.uploadExcel);

    const PriceNameMatchRangeMaster = require('../controllers/pricenamematchrangemaster.controller');
    router.get('/pricenamematchrangemasters/list',PriceNameMatchRangeMaster.list);
    router.post('/pricenamematchrangemasters/add',PriceNameMatchRangeMaster.add);
    router.get('/pricenamematchrangemasters/view/:id',PriceNameMatchRangeMaster.view);
    router.post('/pricenamematchrangemasters/edit/:id',PriceNameMatchRangeMaster.edit);
    router.get('/pricenamematchrangemasters/delete/:id',PriceNameMatchRangeMaster.delete);
    router.post('/pricenamematchrangemasters/uploadexcel',upload.single('excel'),PriceNameMatchRangeMaster.uploadExcel);

    const PriceIngredientMatchRangeMaster = require('../controllers/priceingredientmatchrangemaster.controller');
    router.get('/priceingredientmatchrangemasters/list',PriceIngredientMatchRangeMaster.list);
    router.post('/priceingredientmatchrangemasters/add',PriceIngredientMatchRangeMaster.add);
    router.get('/priceingredientmatchrangemasters/view/:id',PriceIngredientMatchRangeMaster.view);
    router.post('/priceingredientmatchrangemasters/edit/:id',PriceIngredientMatchRangeMaster.edit);
    router.get('/priceingredientmatchrangemasters/delete/:id',PriceIngredientMatchRangeMaster.delete);
    router.post('/priceingredientmatchrangemasters/uploadexcel',upload.single('excel'),PriceIngredientMatchRangeMaster.uploadExcel);

    const PriceFeatureMatchRangeMaster = require('../controllers/pricefeaturematchrangemaster.controller');
    router.get('/pricefeaturematchrangemasters/list',PriceFeatureMatchRangeMaster.list);
    router.post('/pricefeaturematchrangemasters/add',PriceFeatureMatchRangeMaster.add);
    router.get('/pricefeaturematchrangemasters/view/:id',PriceFeatureMatchRangeMaster.view);
    router.post('/pricefeaturematchrangemasters/edit/:id',PriceFeatureMatchRangeMaster.edit);
    router.get('/pricefeaturematchrangemasters/delete/:id',PriceFeatureMatchRangeMaster.delete);
    router.post('/pricefeaturematchrangemasters/uploadexcel',upload.single('excel'),PriceFeatureMatchRangeMaster.uploadExcel);

    const PriceMenuItemScoreBreakDownMaster = require('../controllers/pricemenuitemscorebreakdownmaster.controller');
    router.get('/pricemenuitemscorebreakdownmasters/list',PriceMenuItemScoreBreakDownMaster.list);
    router.post('/pricemenuitemscorebreakdownmasters/add',PriceMenuItemScoreBreakDownMaster.add);
    router.get('/pricemenuitemscorebreakdownmasters/view/:id',PriceMenuItemScoreBreakDownMaster.view);
    router.post('/pricemenuitemscorebreakdownmasters/edit/:id',PriceMenuItemScoreBreakDownMaster.edit);
    router.get('/pricemenuitemscorebreakdownmasters/delete/:id',PriceMenuItemScoreBreakDownMaster.delete);
    router.post('/pricemenuitemscorebreakdownmasters/uploadexcel',upload.single('excel'),PriceMenuItemScoreBreakDownMaster.uploadExcel);

    const PricingModelMatchQualityScoreMaster = require('../controllers/pricingmodelqualityscoremaster.controller');
    router.get('/pricemodelmatchqualityscoremasters/list',PricingModelMatchQualityScoreMaster.list);
    router.post('/pricemodelmatchqualityscoremasters/add',PricingModelMatchQualityScoreMaster.add);
    router.get('/pricemodelmatchqualityscoremasters/view/:id',PricingModelMatchQualityScoreMaster.view);
    router.post('/pricemodelmatchqualityscoremasters/edit/:id',PricingModelMatchQualityScoreMaster.edit);
    router.get('/pricemodelmatchqualityscoremasters/delete/:id',PricingModelMatchQualityScoreMaster.delete);
    router.post('/pricemodelmatchqualityscoremasters/uploadexcel',upload.single('excel'),PricingModelMatchQualityScoreMaster.uploadExcel);


    const PricingModelProteinMaster = require('../controllers/pricingmodelproteinmaster.controller');
    router.get('/pricemodelproteinmasters/list',PricingModelProteinMaster.list);
    router.post('/pricemodelproteinmasters/add',PricingModelProteinMaster.add);
    router.get('/pricemodelproteinmasters/view/:id',PricingModelProteinMaster.view);
    router.post('/pricemodelproteinmasters/edit/:id',PricingModelProteinMaster.edit);
    router.get('/pricemodelproteinmasters/delete/:id',PricingModelProteinMaster.delete);
    router.post('/pricemodelproteinmasters/uploadexcel',upload.single('excel'),PricingModelProteinMaster.uploadExcel);


    const PricingModelVeggieMaster = require('../controllers/pricingmodelveggiemaster.controller');
    router.get('/pricemodelveggiemasters/list',PricingModelVeggieMaster.list);
    router.post('/pricemodelveggiemasters/add',PricingModelVeggieMaster.add);
    router.get('/pricemodelveggiemasters/view/:id',PricingModelVeggieMaster.view);
    router.post('/pricemodelveggiemasters/edit/:id',PricingModelVeggieMaster.edit);
    router.get('/pricemodelveggiemasters/delete/:id',PricingModelVeggieMaster.delete);
    router.post('/pricemodelveggiemasters/uploadexcel',upload.single('excel'),PricingModelVeggieMaster.uploadExcel);

    const PricingModelCheeseMaster = require('../controllers/pricingmodelcheesemaster.controller');
    router.get('/pricemodelcheesemasters/list',PricingModelCheeseMaster.list);
    router.post('/pricemodelcheesemasters/add',PricingModelCheeseMaster.add);
    router.get('/pricemodelcheesemasters/view/:id',PricingModelCheeseMaster.view);
    router.post('/pricemodelcheesemasters/edit/:id',PricingModelCheeseMaster.edit);
    router.get('/pricemodelcheesemasters/delete/:id',PricingModelCheeseMaster.delete);
    router.post('/pricemodelcheesemasters/uploadexcel',upload.single('excel'),PricingModelCheeseMaster.uploadExcel);

    const PricingModelLettuceMaster = require('../controllers/pricingmodellettucemaster.controller');
    router.get('/pricemodellettucemasters/list',PricingModelLettuceMaster.list);
    router.post('/pricemodellettucemasters/add',PricingModelLettuceMaster.add);
    router.get('/pricemodellettucemasters/view/:id',PricingModelLettuceMaster.view);
    router.post('/pricemodellettucemasters/edit/:id',PricingModelLettuceMaster.edit);
    router.get('/pricemodellettucemasters/delete/:id',PricingModelLettuceMaster.delete);
    router.post('/pricemodellettucemasters/uploadexcel',upload.single('excel'),PricingModelLettuceMaster.uploadExcel);

    const PricingModelKey_IngredientMaster = require('../controllers/pricingmodelkeyingredientmaster.controller');
    router.get('/pricemodelkeyingredientmasters/list',PricingModelKey_IngredientMaster.list);
    router.post('/pricemodelkeyingredientmasters/add',PricingModelKey_IngredientMaster.add);
    router.get('/pricemodelkeyingredientmasters/view/:id',PricingModelKey_IngredientMaster.view);
    router.post('/pricemodelkeyingredientmasters/edit/:id',PricingModelKey_IngredientMaster.edit);
    router.get('/pricemodelkeyingredientmasters/delete/:id',PricingModelKey_IngredientMaster.delete);
    router.post('/pricemodelkeyingredientmasters/uploadexcel',upload.single('excel'),PricingModelKey_IngredientMaster.uploadExcel);


    const PricingModelKey_FeatureMaster = require('../controllers/pricingmodelkeyfeaturemaster.controller');
    router.get('/pricemodelkeyfeaturemasters/list',PricingModelKey_FeatureMaster.list);
    router.post('/pricemodelkeyfeaturemasters/add',PricingModelKey_FeatureMaster.add);
    router.get('/pricemodelkeyfeaturemasters/view/:id',PricingModelKey_FeatureMaster.view);
    router.post('/pricemodelkeyfeaturemasters/edit/:id',PricingModelKey_FeatureMaster.edit);
    router.get('/pricemodelkeyfeaturemasters/delete/:id',PricingModelKey_FeatureMaster.delete);
    router.post('/pricemodelkeyfeaturemasters/uploadexcel',upload.single('excel'),PricingModelKey_FeatureMaster.uploadExcel);


    const HMSHOSTBATCHMASTER = require('../controllers/hmshostbatchmaster.controller');
    router.get('/hmshostbatchmaster/list',HMSHOSTBATCHMASTER.list);
    router.post('/hmshostbatchmaster/add',HMSHOSTBATCHMASTER.add);
    router.get('/hmshostbatchmaster/view/:id',HMSHOSTBATCHMASTER.view);
    router.post('/hmshostbatchmaster/edit/:id',HMSHOSTBATCHMASTER.edit);
    router.get('/hmshostbatchmaster/delete/:id',HMSHOSTBATCHMASTER.delete);
    router.post('/hmshostbatchmaster/uploadexcel',upload.single('excel'),HMSHOSTBATCHMASTER.uploadExcel);

    const City = require('../controllers/city.controller');
    router.get('/cities/list',City.list);
    router.post('/cities/add',City.add);
    router.get('/cities/view/:id',City.view);
    router.post('/cities/edit/:id',City.edit);
    router.get('/cities/delete/:id',City.delete);
    router.post('/cities/uploadexcel',upload.single('excel'),City.uploadCityExcel);

    const ZipCode = require('../controllers/zipcode.controller');
    router.get('/zipcodes/list',ZipCode.list);
    router.post('/zipcodes/add',ZipCode.add);
    router.get('/zipcodes/view/:id',ZipCode.view);
    router.post('/zipcodes/edit/:id',ZipCode.edit);
    router.get('/zipcodes/delete/:id',ZipCode.delete);
    router.post('/zipcodes/uploadexcel',upload.single('excel'),ZipCode.uploadExcel);

    const BusinessUnit = require('../controllers/hmshostbusinessunit.controller');
    router.get('/businessunit/list',BusinessUnit.list);
    router.post('/businessunit/add',BusinessUnit.add);
    router.get('/businessunit/view/:id',BusinessUnit.view);
    router.post('/businessunit/edit/:id',BusinessUnit.edit);
    router.get('/businessunit/delete/:id',BusinessUnit.delete);
    router.post('/businessunit/uploadexcel',upload.single('excel'),BusinessUnit.uploadExcel);

    const StoreMaster = require('../controllers/hmshoststoremaster.controller');
    router.get('/storemasters/list',StoreMaster.list);
    router.post('/storemasters/add',StoreMaster.add);
    router.get('/storemasters/view/:id',StoreMaster.view);
    router.post('/storemasters/edit/:id',StoreMaster.edit);
    router.get('/storemasters/delete/:id',StoreMaster.delete);
    router.post('/storemasters/uploadexcel',upload.single('excel'),StoreMaster.uploadExcel);

    const MicroLocation = require('../controllers/hmshostmicrolocationmaster.controller');
    router.get('/microLocations/list',MicroLocation.list);
    router.post('/microLocations/add',MicroLocation.add);
    router.get('/microLocations/view/:id',MicroLocation.view);
    router.post('/microLocations/edit/:id',MicroLocation.edit);
    router.get('/microLocations/delete/:id',MicroLocation.delete);
    router.post('/microLocations/uploadexcel',upload.single('excel'),MicroLocation.uploadExcel);

    const Airlocation = require('../controllers/hmshostairportlocation.controller');
    router.get('/airlocations/list',Airlocation.list);
    router.post('/airlocations/add',Airlocation.add);
    router.get('/airlocations/view/:id',Airlocation.view);
    router.post('/airlocations/edit/:id',Airlocation.edit);
    router.get('/airlocations/delete/:id',Airlocation.delete);
    router.post('/airlocations/uploadexcel',upload.single('excel'),Airlocation.uploadExcel);

    const DepartmentMaster = require('../controllers/hmshostdepartmentmaster.controller');
    router.get('/departmentmasters/list',DepartmentMaster.list);
    router.post('/departmentmasters/add',DepartmentMaster.add);
    router.get('/departmentmasters/view/:id',DepartmentMaster.view);
    router.post('/departmentmasters/edit/:id',DepartmentMaster.edit);
    router.get('/departmentmasters/delete/:id',DepartmentMaster.delete);
    router.post('/departmentmasters/uploadexcel',upload.single('excel'),DepartmentMaster.uploadExcel);

    const FamilyGroupMaster = require('../controllers/hmshostmajorgroupmaster.controller');
    router.get('/familygroupmasters/list',FamilyGroupMaster.list);
    router.post('/familygroupmasters/add',FamilyGroupMaster.add);
    router.get('/familygroupmasters/view/:id',FamilyGroupMaster.view);
    router.post('/familygroupmasters/edit/:id',FamilyGroupMaster.edit);
    router.get('/familygroupmasters/delete/:id',FamilyGroupMaster.delete);
    router.post('/familygroupmasters/uploadexcel',upload.single('excel'),FamilyGroupMaster.uploadExcel);

    const ProductGroupMaster = require('../controllers/hmshostproductgroupmaster.controller');
    router.get('/productgroupmasters/list',ProductGroupMaster.list);
    router.post('/productgroupmasters/add',ProductGroupMaster.add);
    router.get('/productgroupmasters/view/:id',ProductGroupMaster.view);
    router.post('/productgroupmasters/edit/:id',ProductGroupMaster.edit);
    router.get('/productgroupmasters/delete/:id',ProductGroupMaster.delete);
    router.post('/productgroupmasters/uploadexcel',upload.single('excel'),ProductGroupMaster.uploadExcel);


    const Menu1GroupMaster = require('../controllers/hmshostmenu1groupmaster.controller');
    router.get('/menu1groupmasters/list',Menu1GroupMaster.list);
    router.post('/menu1groupmasters/add',Menu1GroupMaster.add);
    router.get('/menu1groupmasters/view/:id',Menu1GroupMaster.view);
    router.post('/menu1groupmasters/edit/:id',Menu1GroupMaster.edit);
    router.get('/menu1groupmasters/delete/:id',Menu1GroupMaster.delete);
    router.post('/menu1groupmasters/uploadexcel',upload.single('excel'),Menu1GroupMaster.uploadExcel);

    const Menu2GroupMaster = require('../controllers/hmshostmenu2groupmaster.controller');
    router.get('/menu2groupmasters/list',Menu2GroupMaster.list);
    router.post('/menu2groupmasters/add',Menu2GroupMaster.add);
    router.get('/menu2groupmasters/view/:id',Menu2GroupMaster.view);
    router.post('/menu2groupmasters/edit/:id',Menu2GroupMaster.edit);
    router.get('/menu2groupmasters/delete/:id',Menu2GroupMaster.delete);
    router.post('/menu2groupmasters/uploadexcel',upload.single('excel'),Menu2GroupMaster.uploadExcel);

    const QualityGroupMaster = require('../controllers/hmshostqualitygroupmaster.controller');
    router.get('/qualitygroupmasters/list',QualityGroupMaster.list);
    router.post('/qualitygroupmasters/add',QualityGroupMaster.add);
    router.get('/qualitygroupmasters/view/:id',QualityGroupMaster.view);
    router.post('/qualitygroupmasters/edit/:id',QualityGroupMaster.edit);
    router.get('/qualitygroupmasters/delete/:id',QualityGroupMaster.delete);
    router.post('/qualitygroupmasters/uploadexcel',upload.single('excel'),QualityGroupMaster.uploadExcel);

    const POSMenusubcategory = require('../controllers/posmenusubcategorymaster.controller');
    router.get('/posmenusubcategories/list',POSMenusubcategory.list);
    router.post('/posmenusubcategories/add',POSMenusubcategory.add);
    router.get('/posmenusubcategories/view/:id',POSMenusubcategory.view);
    router.post('/posmenusubcategories/edit/:id',POSMenusubcategory.edit);
    router.get('/posmenusubcategories/delete/:id',POSMenusubcategory.delete);
    router.post('/posmenusubcategories/uploadexcel',upload.single('excel'),POSMenusubcategory.uploadExcel);

    const StandardizedMenuCategoryMaster = require('../controllers/standardizedMenucategorymaster.controller');
    router.get('/standardizedmenucategorymaster/list',StandardizedMenuCategoryMaster.list);
    router.post('/standardizedmenucategorymaster/add',StandardizedMenuCategoryMaster.add);
    router.get('/standardizedmenucategorymaster/view/:id',StandardizedMenuCategoryMaster.view);
    router.post('/standardizedmenucategorymaster/edit/:id',StandardizedMenuCategoryMaster.edit);
    router.get('/standardizedmenucategorymaster/delete/:id',StandardizedMenuCategoryMaster.delete);
    router.post('/standardizedmenucategorymaster/uploadexcel',upload.single('excel'),StandardizedMenuCategoryMaster.uploadExcel);

    const COmpStandardizedMenuCategoryMaster = require('../controllers/compstandardizedMenucategorymaster.controller');
    router.get('/compstandardizedmenucategorymaster/list',COmpStandardizedMenuCategoryMaster.list);
    router.post('/compstandardizedmenucategorymaster/add',COmpStandardizedMenuCategoryMaster.add);
    router.get('/compstandardizedmenucategorymaster/view/:id',COmpStandardizedMenuCategoryMaster.view);
    router.post('/compstandardizedmenucategorymaster/edit/:id',COmpStandardizedMenuCategoryMaster.edit);
    router.get('/compstandardizedmenucategorymaster/delete/:id',COmpStandardizedMenuCategoryMaster.delete);
    router.post('/compstandardizedmenucategorymaster/uploadexcel',upload.single('excel'),COmpStandardizedMenuCategoryMaster.uploadExcel);

    const MenuItemMaster = require('../controllers/hmshostmenuitemmaster.controller');
    router.get('/menuitemmaster/list',MenuItemMaster.list);
    router.post('/menuitemmaster/add',MenuItemMaster.add);
    router.get('/menuitemmaster/view/:id',MenuItemMaster.view);
    router.post('/menuitemmaster/edit/:id',MenuItemMaster.edit);
    router.get('/menuitemmaster/delete/:id',MenuItemMaster.delete);
    router.post('/menuitemmaster/uploadexcel',upload.single('excel'),MenuItemMaster.uploadExcel);

    const PosMenuItemMaster = require('../controllers/hmshostposmenuitemmaster.controller');
    router.get('/posmenuitemmaster/list',PosMenuItemMaster.list);
    router.post('/posmenuitemmaster/add',PosMenuItemMaster.add);
    router.get('/posmenuitemmaster/view/:id',PosMenuItemMaster.view);
    router.post('/posmenuitemmaster/edit/:id',PosMenuItemMaster.edit);
    router.get('/posmenuitemmaster/delete/:id',PosMenuItemMaster.delete);
    router.post('/posmenuitemmaster/uploadexcel',upload.single('excel'),PosMenuItemMaster.uploadExcel);

    const CompStoreMenuNameMaster = require('../controllers/compstoremenunamemaster.controller');
    router.get('/storemenunamemaster/list',CompStoreMenuNameMaster.list);
    router.post('/storemenunamemaster/add',CompStoreMenuNameMaster.add);
    router.get('/storemenunamemaster/view/:id',CompStoreMenuNameMaster.view);
    router.post('/storemenunamemaster/edit/:id',CompStoreMenuNameMaster.edit);
    router.get('/storemenunamemaster/delete/:id',CompStoreMenuNameMaster.delete);
   // router.post('/posmenuitemmaster/uploadexcel',upload.single('excel'),PosMenuItemMaster.uploadExcel);
    const Prestepdata = require('../controllers/hmshostprestepdatamaster.controller');
    router.post('/prestepdata/add',Prestepdata.add);
    router.get('/prestepdata/list/:airlocationid/:batchid',Prestepdata.list);
    router.get('/prestepdata/view/:id',Prestepdata.view);
    router.get('/prestepdata/delete/:id',Prestepdata.delete);


    const HmsHostMenudata = require('../controllers/hmshostmenudatadatamaster.controller');
    router.get('/hmshostmenudata/list/:airlocationid/:batchid',HmsHostMenudata.list);

    const CompStoreRestData = require('../controllers/compstoreresturantdatamaster.controller');
    router.get('/compstorerestdata/list/:airlocationid/:batchid',CompStoreRestData.list);

    app.use('/api/webservices',router);	
    
}