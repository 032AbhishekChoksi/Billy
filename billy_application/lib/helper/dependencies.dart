import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/controllers/customer_controller.dart';
import 'package:billy_application/controllers/onboard_controller.dart';
import 'package:billy_application/controllers/restaurant_controller.dart';
import 'package:billy_application/data/repository/auth_repo.dart';
import 'package:billy_application/data/repository/customer_repo.dart';
import 'package:billy_application/data/repository/onboard_repo.dart';
import 'package:billy_application/data/repository/restaurant_repo.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:billy_application/controllers/banner_controller.dart';
import 'package:billy_application/controllers/cuisines_controller.dart';
import 'package:billy_application/data/api/api_client.dart';
import 'package:billy_application/data/repository/banner_repo.dart';
import 'package:billy_application/data/repository/cuisines_repo.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> init() async {
  final sharedPreferences = await SharedPreferences.getInstance();

  Get.lazyPut(() => sharedPreferences);
  //api client
  Get.lazyPut(() => ApiClient(
      appBaseUrl: AppConstants.baseURL, sharedPreferences: Get.find()));

  //repos
  Get.lazyPut(() => BannerRepo(apiClient: Get.find()));
  Get.lazyPut(() => CuisinesRepo(apiClient: Get.find()));
  Get.lazyPut(
      () => AuthRepo(apiClient: Get.find(), sharedPreferences: Get.find()));
  Get.lazyPut(
      () => CustomerRepo(apiClient: Get.find(), sharedPreferences: Get.find()));
  Get.lazyPut(() => OnboardRepo(sharedPreferences: Get.find()));
  Get.lazyPut(() => RestaurantRepo(apiClient: Get.find()));

  //controller
  Get.lazyPut(() => AuthController(authRepo: Get.find()));
  Get.lazyPut(() => BannerController(bannerRepo: Get.find()));
  Get.lazyPut(() => CuisinesController(cuisinesRepo: Get.find()));
  Get.lazyPut(() => CustomerController(customerRepo: Get.find()));
  Get.lazyPut(() => OnboardController(onboardRepo: Get.find()));
  Get.lazyPut(() => RestaurantController(restaurantRepo: Get.find()));
}
