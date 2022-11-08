import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_icon.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:billy_application/widgets/widget_account.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:line_icons/line_icons.dart';

class AccountPage extends StatelessWidget {
  const AccountPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.mainColor,
        title: BigText(
          text: "Profile",
          size: Dimensions.font24,
          color: Colors.white,
        ),
      ),
      body: Container(
        width: double.maxFinite,
        margin: EdgeInsets.only(top: Dimensions.height20),
        child: Column(
          children: [
            // profile icon
            AppIcon(
              // icon: LineIcons.user,
              icon: Icons.person,
              backgroundColor: AppColors.mainColor,
              iconColor: Colors.white,
              iconSize: Dimensions.iconSize75,
              size: Dimensions.height150,
            ),
            SizedBox(
              height: Dimensions.height10,
            ),
            // Option List
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    // Option 1
                    AccountWidget(
                      optionTitle: "Orders",
                      optionSubTitle: "Check my orders",
                      optionIcon: AppIcon(
                        icon: LineIcons.shoppingCart,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                      ),
                      optiononTap: () => {
                        Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 2
                    AccountWidget(
                      optionTitle: "Edit Profile",
                      optionSubTitle: "Update your profile",
                      optionIcon: AppIcon(
                        icon: LineIcons.userEdit,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                        backgroundColor: AppColors.mainColor,
                        iconColor: Colors.white,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 3
                    AccountWidget(
                      optionTitle: "Fill in your address",
                      optionSubTitle: "change your address",
                      optionIcon: AppIcon(
                        icon: LineIcons.mapMarked,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                      ),
                      optiononTap: () => {
                        Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 4
                    AccountWidget(
                      optionTitle: "Reviews",
                      optionSubTitle: "Review on order",
                      optionIcon: AppIcon(
                        icon: Icons.reviews,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                        backgroundColor: AppColors.mainColor,
                        iconColor: Colors.white,
                      ),
                      optiononTap: () => {
                        Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 5
                    AccountWidget(
                      optionTitle: "Wallet",
                      optionSubTitle: "Rewords on your Wallet",
                      optionIcon: AppIcon(
                        icon: LineIcons.wallet,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 6
                    AccountWidget(
                      optionTitle: "Refer and Earn",
                      optionSubTitle:
                          "Refer the apps to your friends or family members",
                      optionIcon: AppIcon(
                        icon: LineIcons.indianRupeeSign,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                        backgroundColor: AppColors.mainColor,
                        iconColor: Colors.white,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 7
                    AccountWidget(
                      optionTitle: "Setting",
                      optionSubTitle: "Change billy setting",
                      optionIcon: AppIcon(
                        icon: Icons.settings,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),

                    // Option 8
                    AccountWidget(
                      optionTitle: "Terms and Conditions",
                      optionSubTitle: "Rewords on your Wallet",
                      optionIcon: AppIcon(
                        icon: LineIcons.fileContract,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                        backgroundColor: AppColors.mainColor,
                        iconColor: Colors.white,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height20,
                    ),
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
