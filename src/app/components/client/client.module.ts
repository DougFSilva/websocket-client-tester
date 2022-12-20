
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

import { ClientComponent } from './client.component';

@NgModule({
  declarations: [ClientComponent],
  imports: [CommonModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule],
  exports: [ClientComponent],
})
export class ClientModule {}
