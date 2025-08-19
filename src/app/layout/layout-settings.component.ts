import { Component, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatList, MatListItem, MatListItemMeta } from "@angular/material/list";
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';

@Component({
  selector: 'app-layout-settings',
  imports: [
    MatIcon,
    MatIconButton,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    MatCard,
    MatCardContent,
    MatList,
    MatListItem,
    MatListItemMeta,
    MatCardHeader,
    MatCardTitle,
    MatButtonToggleGroup,
    MatButtonToggle,
],
  template: `
    <button 
      matIconButton 
      cdkOverlayOrigin 
      #trigger="cdkOverlayOrigin"
      (click)="isOpen.set(!isOpen())"
    >
      <mat-icon>settings</mat-icon>
    </button>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      (overlayOutsideClick)="isOpen.set(false)"
      (detach)="isOpen.set(false)"
    >
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            Settings
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item>
              Language
              <mat-button-toggle-group matListItemMeta>
                <mat-button-toggle>English</mat-button-toggle>
                <mat-button-toggle>Arabic</mat-button-toggle>
              </mat-button-toggle-group>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </ng-template>
  `,
  styles: `
    mat-card {
      box-shadow: var(--mat-sys-level2);
      margin-inline-end: 0.5rem;
    }

    mat-list-item {
      padding: 0 !important;
    }
  `,
})
export class LayoutSettingsComponent {
  protected isOpen = signal(false);
}
