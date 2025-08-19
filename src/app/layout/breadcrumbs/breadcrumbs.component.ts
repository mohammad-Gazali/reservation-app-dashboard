import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Directive,
  input,
  contentChildren,
  inject,
  TemplateRef,
  contentChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[appBreadcrumbItem]',
})
export class BreadcrumbItemDirective {
  public templateRef = inject(TemplateRef);
}

@Directive({
  selector: '[appBreadcrumbSeparator]',
})
export class BreadcrumbSeparatorDirective {
  public templateRef = inject(TemplateRef);
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  imports: [MatIcon, NgTemplateOutlet],
})
export class BreadcrumbsComponent {
  ariaLabel = input<string>('breadcrumbs', { alias: 'aria-label' });

  items = contentChildren<BreadcrumbItemDirective>(BreadcrumbItemDirective);
  separatorTemplateRef = contentChild<BreadcrumbSeparatorDirective>(
    BreadcrumbSeparatorDirective
  );
}
