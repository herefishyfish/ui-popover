import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { NativePopoverRef } from './popover-ref';
import { NativePopover } from './popover-services';
import { View } from '@nativescript/core';

/**
 * Button that will close the current popover.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[native-popover-close], [nativePopoverClose]',
    exportAs: 'nativePopoverClose',
    standalone: true
})
export class NativePopoverCloseDirective implements OnInit, OnChanges {
    /** Popover close input. */
    @Input('native-popover-close') popoverResult: any;
    @Input('nativePopoverClose') _nativePopoverClose: any;
    popoverRef = inject(NativePopoverRef<any>, { optional: true });
    private _elementRef = inject(ElementRef, { optional: true });
    private _popoverService = inject(NativePopover, { optional: true });

    ngOnInit() {
        // If DI didn't provide the popover ref (template embedded views), try
        // to locate the popover by walking up the native view parent chain and
        // looking for the `__ng_popover_id__` marker.
        if (!this.popoverRef && this._elementRef && this._popoverService) {
            let view: any = (this._elementRef as ElementRef<View>).nativeElement.parent;
            while (view && !Object.prototype.hasOwnProperty.call(view, '__ng_popover_id__')) {
                view = view.parent;
            }
            if (view && view['__ng_popover_id__']) {
                const ref = this._popoverService.getPopoverById(view['__ng_popover_id__']);
                if (ref) {
                    this.popoverRef = ref as any;
                }
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        const proxiedChange = changes['_nativePopoverClose'] || changes['_nativePopoverCloseResult'];
        if (proxiedChange) {
            this.popoverResult = proxiedChange.currentValue;
        }
    }

    @HostListener('tap')
    _onButtonClick() {
        this.popoverRef?.close(this.popoverResult);
    }
}
