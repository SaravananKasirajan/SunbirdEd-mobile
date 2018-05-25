import { boardList } from './../../../config/framework.filters';
import { Component } from '@angular/core';
import { NavController, PopoverController, Events, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';

import { GuestEditProfilePage } from './../guest-edit.profile/guest-edit.profile';
import { OverflowMenuComponent } from "./../overflowmenu/menu.overflow.component";
import { ProfileService, FrameworkDetailsRequest, FrameworkService, SharedPreferences } from 'sunbird';
import { UserTypeSelectionPage } from '../../user-type-selection/user-type-selection';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-guest-profile',
  templateUrl: 'guest-profile.html',
})

export class GuestProfilePage {

  imageUri: string = "assets/imgs/ic_profile_default.png";
  list: Array<String> = ['SETTINGS'];

  showSignInCard: boolean = false;
  isNetworkAvailable: boolean;
  showWarning: boolean = false;
  /* Temporary Language Constants */
  userName: string = "Teacher";
  profileName: string = "Guest 1";
  boards: string = "";
  grade: string = "";
  medium: string = "";
  subjects: string = "";
  categories: Array<any> = []
  profile: any = {};

  constructor(public navCtrl: NavController,
    public network: Network,
    public popoverCtrl: PopoverController,
    private profileService: ProfileService,
    private loadingCtrl: LoadingController,
    private events: Events,
    private frameworkService: FrameworkService,
    private preference: SharedPreferences
  ) {
    // TODO: Need to make an get Profile user details API call.
    this.refreshProfileData();
    this.events.subscribe('refresh:profile', () => {
      this.refreshProfileData();
    });

    this.preference.getString('selected_user_type', (val) => {
      if (val == "teacher") {
        this.showSignInCard = true;
      } else if (val == "student") {
        this.showSignInCard = false;
      }
    })
    if (this.network.type === 'none') {
      this.isNetworkAvailable = false;
    } else {
      this.isNetworkAvailable = true;
    }
    this.network.onDisconnect().subscribe((data) => {
      this.isNetworkAvailable = false;
    });
    this.network.onConnect().subscribe((data) => {
      this.isNetworkAvailable = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguageSettingPage');
  }

  refreshProfileData(refresher: any = false) {
    let loader = this.getLoader();
    loader.present();
    this.profileService.getCurrentUser((res: any) => {
      this.profile = JSON.parse(res);
      this.getFrameworkDetails();
      setTimeout(() => {
        if (refresher) refresher.complete();
        loader.dismiss();
      }, 500);
      console.log("Response", res);
    },
      (err: any) => {
        loader.dismiss();
        console.log("Err1", err);
      });
  }
  editGuestProfile() {
    if (!this.isNetworkAvailable) {
      this.showNetworkWarning();
    }
    else {
      this.navCtrl.push(GuestEditProfilePage, {
        profile: this.profile
      });
    }
  }

  showNetworkWarning() {
    this.showWarning = true;
    setTimeout(() => {
      this.showWarning = false;
    }, 3000);
  }
  /**
   * To show popover menu
   * @param {object} event
   */
  showOverflowMenu(event) {
    this.popoverCtrl.create(OverflowMenuComponent, {
      list: this.list
    }, {
        cssClass: 'box'
      }).present({
        ev: event
      });
  }

  getLoader(): any {
    return this.loadingCtrl.create({
      duration: 30000,
      spinner: "crescent"
    });
  }

  getFrameworkDetails(): void {
    let req: FrameworkDetailsRequest = {
      defaultFrameworkDetails: true
    };

    this.frameworkService.getFrameworkDetails(req,
      (res: any) => {
        this.categories = JSON.parse(JSON.parse(res).result.framework).categories;
        if (this.profile.board && this.profile.board.length) {
          this.boards = this.getFieldDisplayValues(this.profile.board, 0);
        }
        if (this.profile.grade && this.profile.grade.length) {
          this.grade = this.getFieldDisplayValues(this.profile.grade, 1);
        }
        if (this.profile.subject && this.profile.subject.length) {
          this.subjects = this.getFieldDisplayValues(this.profile.subject, 2);
        }
        if (this.profile.medium && this.profile.medium.length) {
          this.medium = this.getFieldDisplayValues(this.profile.medium, 3);
        }


        /* let boardList = [];
        this.profile.board && this.profile.board.length && categories[0].terms.forEach(element => {
          if (_.includes(this.profile.board, element.code)) {
            boardList.push(element.name);
          }
        });
        this.boards = this.arrayToString(boardList); */
      },
      (error: any) => {

      });
  }

  getFieldDisplayValues(field: Array<any>, catIndex: number): string {
    let displayValues = [];
    this.categories[catIndex].terms.forEach(element => {
      if (_.includes(field, element.code)) {
        displayValues.push(element.name);
      }
    });
    return this.arrayToString(displayValues);
  }

  /**
   * Method to convert Array to Comma separated string
   * @param {Array<string>} stringArray
   * @returns {string}
   */
  arrayToString(stringArray: Array<string>): string {
    return stringArray.join(", ");
  }

  /**
   * Takes the user to role selection screen
   *
   */
  goToRoles() {
    if (!this.isNetworkAvailable) {
      this.showNetworkWarning();
    }
    else {
      this.navCtrl.push(UserTypeSelectionPage, {
        profile: this.profile
      })
    }
  }

  buttonClick(isNetAvailable) {
   
    this.showNetworkWarning();
  }
}
