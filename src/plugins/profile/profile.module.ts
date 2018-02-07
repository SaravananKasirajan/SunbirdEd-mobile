import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { CoreModule } from '../../core/core.module';
import { PluginService } from '../../core/plugin/plugin.service';
import { BasePlugin } from '../../core/plugin/plugin.service';
import { CameraService } from '../../core/services/camera.service';
import { ContainerService } from '../../core/container/container.services';
import { Camera } from '@ionic-native/camera';
import { FormEducation } from './education/form.education';
import { FormAddress } from './address/form.address';


@NgModule({
  declarations: [
    ProfilePage,
    FormEducation,
    FormAddress
  ],
  entryComponents: [FormEducation, FormAddress],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
  exports: [
    ProfilePage,
    FormAddress,
    FormEducation
  ],
  providers: [
    ContainerService,
    Camera,
    CameraService
  ]
})
export class ProfilePageModule { }
