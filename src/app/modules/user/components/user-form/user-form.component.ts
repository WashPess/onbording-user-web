import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";


@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: [ './user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    public countries = [
        { name: 'Brasil', code: 'BR' },
        { name: 'Argentina', code: 'AG' },
        { name: 'Colombia', code: 'CO' },
        { name: 'Uruguai', code: 'UR' },
        { name: 'Paraguai', code: 'PA' },
        { name: 'Venezuela', code: 'VE' },
        { name: 'Peru', code: 'PE' },
        { name: 'Chile', code: 'CH' },
        { name: 'Guiana', code: 'GU' },
        { name: 'Guiana Francesa', code: 'GF' },
        { name: 'Bolívia', code: 'BO' },
        { name: 'Equador', code: 'EQ' },
        { name: 'Suriname', code: 'SU' },
    ];

    public languages = [
      { name: 'Portugues', acronym: 'PT-BR' },
      { name: 'Castelhano Argentino', acronym: 'CA-AG' },
      { name: 'Castelhano Colombiano', acronym: 'CA-CO' },
      { name: 'Castelhano Uruguaiano', acronym: 'CA-UR' },
      { name: 'Espanhol Paraguaio', acronym: 'ES-PA' },
      { name: 'Espanhol Venezuelano', acronym: 'ES-VE' },
      { name: 'Espanhol Peruano', acronym: 'ES-PE' },
      { name: 'Castelhano Chinelo', acronym: 'ES-CH' },
      { name: 'Ingles', acronym: 'EG-GU' },
      { name: 'Frances', acronym: 'FC-GF' },
      { name: 'Espanhol Boliviano', acronym: 'ES-BO' },
      { name: 'Espanhol Equatorianos', acronym: 'ES-EQ' },
      { name: 'Neerlandês', acronym: 'NE-SU' },
    ];

    public form = new FormGroup({
        firstName: new FormControl('simão', []),
        lastName: new FormControl('pedro', []),
        company: new FormControl('Facebook', []),
        contactPhone: new FormControl('99 9999 9999', []),
        companySite: new FormControl('www.facebook.com', []),
        country: new FormControl(null, []),
        language: new FormControl('PT-BR', []),
        timeZone: new FormControl('PT-BR', []),
        currency: new FormControl('BRL', []),
        email: new FormControl(true, []),
        telefone: new FormControl(true, []),
        allowMarketing: new FormControl(true, []),

    });

    ngOnInit() {
        this.changeCountry();
    }

    public print() {
        console.log("FIRSTNAME: ", this.form?.value);
    }

    // escuta alteraçoes em country
    public changeCountry() {
        this.form.get("currency")?.disable();
        this.form.get('country')?.valueChanges.subscribe((value: string | null)=> {

            console.log("COUNTRY: ", value);

            if(!value) {
                return;
            }
            this.form.get('qualqiercoisa')?.enable();
            this.form.get("currency")?.disable();

            if(value === 'BR') {
                this.form.get('currency')?.setValue('BRL');
            }
        });
    }

}
