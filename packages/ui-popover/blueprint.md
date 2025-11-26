{{ load:../../tools/readme/edit-warning.md }}
{{ template:title }}
{{ template:badges }}
{{ template:description }}

{{ template:toc }}

## Installation
Run the following command from the root of your project:

`ns plugin add {{ pkg.name }}`

## API

### Using Svelte
```ts
  import { showPopover } from '{{ pkg.name }}/svelte';

  showPopover({
    view: YourInnerSvelteComponent,
    props: {}
  });
```

### Using Vue
```ts
  import PopoverPlugin from '{{ pkg.name }}/vue';
  Vue.use(PopoverPlugin);

  //in your components
  this.$showPopover(YourInnerVueComponent, {
    props: {}
  });
```

### Using Angular
```ts
import { Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativePopover, NativePopoverModule } from '{{ pkg.name }}/angular';
import { View } from '@nativescript/core';

@Component({})
export class BasicPopoverComponent {
  popover = inject(NativePopover);

  showPopover(anchor: View) {
    this.popover.open(PopoverContentComponent, {
      anchor,
      data: {}
    });
  }
}
```

### Methods
```ts
 interface PopoverOptions {
    anchor: View;
    vertPos?: VerticalPosition;
    horizPos?: HorizontalPosition;
    x?: number;
    y?: number;
    fitInScreen?: boolean;
    onDismiss?: Function;
}
```

| Name         | Return | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| showPopover(options: PopoverOptions)       | `void` | Programatically open the popover                 |
| closePopover(options: PopoverOptions)      | `void` | Programatically close the popover                |

{{ load:../../tools/readme/demos-and-development.md }}
{{ load:../../tools/readme/questions.md }}