import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[documentmask]'
})
export class DocumentMaskDirective {

  constructor(private readonly el: ElementRef, private readonly control: NgControl) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {

    let value = this.el.nativeElement.value.replace(/\D/g, ''); // Remove tudo que não é número

    if (!value) {
      this.control.control?.setValue(''); // Quando o campo está vazio, aplica a máscara do CPF
      return;
    }

    const size = value.length;

    if (size <= 11) {
      // Máscara CPF (###.###.###-##)
      value = value.slice(0, 11);
      value = value.padEnd(11, '_'); // Adiciona underscores para os espaços restantes
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {  // Máscara CNPJ (##.###.###/####-##)
      value = value.slice(0, 14);
      value = value.padEnd(14, '_'); // Adiciona underscores para os espaços restantes
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }


    this.control.control?.setValue(value); // Atualiza o valor no controle reativo
  }

  @HostListener('blur')
  onBlur() {
    let value = this.el.nativeElement.value.replace(/\D/g, ''); // Remove tudo que não é número

    if (value.length === 0) {
      this.control.control?.setValue(''); // Aplica a máscara do CPF como padrão
    }
  }
}
