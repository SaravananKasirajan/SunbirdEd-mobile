import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportsPage } from './reports';
import { ReportListPage } from '../reports/report-list/report-list'
import { GroupReportAlert } from '../reports/group-report-alert/group-report-alert'
import { GroupListPage } from '../reports/group-list/group-list'
import { GroupReportListPage } from '../reports/group-report-list/group-report-list'
import { ReportAlert } from '../reports/report-alert/report-alert'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ReportsPage,GroupReportAlert, ReportAlert, ReportListPage,GroupReportListPage, GroupListPage
  ],
  entryComponents: [GroupReportAlert, ReportsPage,ReportListPage, ReportAlert,GroupListPage,GroupReportListPage],
  imports: [
    IonicPageModule.forChild(ReportsPage),
    // OnboardingPageModule,
		// LanguageSettingsPageModule,
	//	IonicPageModule.forChild(SettingsPage),
		TranslateModule.forChild()
  ],
})
export class ReportsPageModule {}
