import {Component, OnInit} from '@angular/core';
import * as mermaid from "mermaid";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailRegx} from "../../core/constants/email-regx";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedModule} from "../../shared/shared.module";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {AuthService} from "../authentification/services/auth.service";
import {ResponseApi} from "../authentification/interfaces/response-api.interface";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/components/dialog/dialog.component";
import {SessionService} from "../../core/services/session.service";
import {ThreadService} from "../database/services/thread.service";
import {Thread} from "../../core/models/thread.interface";

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    imports: [
        SharedModule,
        NgClass,
        NgForOf,
        DatePipe
    ],
    styleUrl: './my-account.component.scss'
})
export class MyAccountComponent implements OnInit {

    public meForm!: FormGroup;
    public visible: boolean = false;
    public tab: string = 'profile'
    public projects: Thread[] = []

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private sessionService: SessionService,
        private threadService: ThreadService,
        private dialog: MatDialog,
        private router: Router
    ) {
        this.meForm = this.formBuilder.group({
            firstname: [''],
            lastname: [''],
            email: ['', [ Validators.email, Validators.pattern(EmailRegx)]],
            password: [''],
        });
    }

    ngOnInit(): void {
        this.threadService.getThreads().subscribe({
            next: (response) => {
                if (response.status === 'success') {
                    this.projects = response.data;
                    console.log(this.projects);
                }
                else {
                    this.snackBar.open(response.message, '✕', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        panelClass: ['error-snackbar'],
                    });
                }
            },
            error: (err) => {
                console.error(err);
                this.snackBar.open(err.message, '✕', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    panelClass: ['error-snackbar'],
                });
            }
        })
    }

    public updateInfo(): void {
        console.log(this.meForm.value);
    }

    public toggleVisible(): void {
        this.visible = !this.visible;
    }

    public googleLogin(): void {
        return;
    }

    get email() {
        return this.meForm.get('email');
    }

    get password() {
        return this.meForm.get('password');
    }

    public updateFirstName(): void {
        console.log(this.meForm.value.firstname);
    }

    public updateLastName(): void {
        console.log(this.meForm.value.lastname);
    }

    public updatePassword(): void {
        console.log(this.meForm.value.password);
    }

    public deleteProject(id: string, event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
        console.log("deleting project " + id);
        this.dialog.open(DialogComponent, {
            data: {
                title: 'Suppression du projet',
                message: 'Êtes-vous sûr de vouloir supprimer ce projet ?',
                cancelText: 'Non',
                confirmText: 'Oui'
            },

            position: {
                top: '50px',
            }
        }).afterClosed().subscribe((result) => {
            if (result !== undefined && result === true) {
                this.threadService.deleteThread(id).subscribe({
                    next: (response: ResponseApi) => {
                        if (response.status === 'success') {
                            this.projects = this.projects.filter(project => project.id !== id);
                            this.snackBar.open(response.message, '✕', {
                                duration: 4000,
                                horizontalPosition: 'center',
                                verticalPosition: 'top',
                                panelClass: ['success-snackbar'],
                            });
                        }
                    },
                    error: (err) => {
                        this.snackBar.open(err.message, '✕', {
                            duration: 4000,
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                            panelClass: ['error-snackbar'],
                        });
                        console.error(err);
                    }
                })
            }
        })
    }

    public logout(): void {
        this.dialog.open(DialogComponent, {
            data: {
                title: 'Déconnexion',
                message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
                cancelText: 'Non',
                confirmText: 'Oui'
            },

            position: {
                top: '50px',
            }
        }).afterClosed().subscribe((result) => {
            if (result !== undefined && result === true) {
                this.authService.logout().subscribe({
                    next: (response: ResponseApi) => {
                        this.router.navigate(["/auth/login"]);
                        this.sessionService.setLogged(false);
                        this.snackBar.open(response.message, '✕', {
                            duration: 4000,
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                            panelClass: ['success-snackbar'],
                        });
                    },
                    error: (error) => {
                        console.error(error);
                    }
                })
            }
        })
    }

    public changeTab(tab: string): void {
        this.tab = tab;
    }
}
