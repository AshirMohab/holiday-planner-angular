import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Ant-d
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzGridModule,
    NzTabsModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzSwitchModule,
    NzNotificationModule,
    NzIconModule,
    NzCalendarModule,
    NzBadgeModule,
    NzLayoutModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    NzSpinModule,
    NzTimelineModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzTabsModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzSwitchModule,
    NzNotificationModule,
    NzIconModule,
    NzCalendarModule,
    NzBadgeModule,
    NzLayoutModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    NzSpinModule,
    NzTimelineModule,
  ],
})
export class SharedModule {}
