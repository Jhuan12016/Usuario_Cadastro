import { Usuario } from '../../../models/src/usuarios';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridComponent, SortService } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ToastServiceComponent } from 'src/app/module/shared/toast-service/toast-service.component';
import { UsuarioService } from '../../../services/usuario/usuario.service';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
  gender: string;
  birthdate: string;
  maritalstatus:string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [
    SortService,
    UsuarioService,
    DialogComponent,
    ToastServiceComponent,
  ],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  @ViewChild(GridComponent, { static: false })
  private gridComponent!: GridComponent;
  @ViewChild('modal', { static: true })
  modal!: DialogComponent;

  dataSource: GridRow[] = [
    { id: 1, name: 'jhuan Gabriel de Souza', gender:'Masculino', birthdate:'17/09/1998',maritalstatus:'Casado' },
    { id: 2, name: 'jenny Rabelo de Souza', gender:'Feminino', birthdate:'30/09/1998',maritalstatus:'Casado' },
    { id: 3, name: 'Mateus Walz', gender:'Masculino', birthdate:'17/12/1999',maritalstatus:'Solteiro' },


  ];

  form: FormGroup = this.createForm();
  isModalOpen = false;

  private usuarioService!: UsuarioService;

  constructor(private toastService: ToastServiceComponent) {}

  ngOnInit(): void {
    this.loadData();
  }

  async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        this.findUsuario(id);
      }
      this.isModalOpen = true;
      this.modal.show();
    } catch (error) {}
  }

  async onModalClose(): Promise<void> {
    this.isModalOpen = false;
  }

  async onEdit(model: GridRow): Promise<void> {
    console.log(model);
    await this.onOpen(model.id);
  }

  async onRemove(model: GridRow): Promise<void> {
    if (!model.id) return;
    this.usuarioService
      .deleteById(model.id)
      .pipe()
      .subscribe(
        async () => {
          await this.toastService.removeToast('Removido');
        },
        (error) => this.toastService.errorToast(error)
      );
    this.loadData();
  }
  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const model = this.getModel();
    const exists = model.id > 1;
    console.log(model)
    if (
      exists
        ? this.usuarioService
            .updateById(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.updateToast();
                this.reset();
              },
              (error) => this.toastService.errorToast(error)
            )
        : this.usuarioService
            .add(model)
            .pipe()
            .subscribe(
              async () => {
                await this.toastService.saveToast();
              },
              (error) => this.toastService.errorToast(error)
            )
    )
      return;
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    this.usuarioService
      .findAll()
      .pipe()
      .subscribe(async (usuarios) => {
        this.dataSource = usuarios;
      });
  }

  private async findUsuario(id: number): Promise<void> {
    this.usuarioService
      .findById(id)
      .pipe()
      .subscribe(
        async (usuario) => {
          this.populateForm(usuario);
        },
        (error) => this.toastService.errorToast(error)
      );
  }

  private populateForm(usuario: Usuario): void {
    this.form.patchValue({
      id: usuario.id,
      name: usuario.name,
    });
  }

  private getModel(): Usuario {
    const model = new Usuario();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : (formValue.id as number);
    model.name = formValue.name as string;
    model.gender = formValue.gender as string;
    model.birthdate = formValue.birthdate as string;
    model.maritalstatus = formValue.maritalstatus as string;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private createForm(): FormGroup {
    return (this.form = new FormGroup({
      id: new FormControl({ value: NEW_ID, disabled: true }),
      name: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(200),
      ]),
      gender: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(30),
      ]),
      birthdate: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(30),
      ]),
      maritalstatus: new FormControl(null, [
        FormValidators.required,
        Validators.maxLength(30),
      ]),
    }));
  }
}
