import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'document',
        loadChildren: () => import('./pages/document/document.module').then(m => m.DocumentPageModule)
    },
    {
        path: 'etat-global-dossier',
        loadChildren: () => import('./pagesDossiers/etat-global-dossier/etat-global-dossier.module').then(m => m.EtatGlobalDossierPageModule)
    },
    {
        path: 'performande-comparee',
        loadChildren: () => import('./pagesDossiers/performande-comparee/performande-comparee.module').then(m => m.PerformandeCompareePageModule)
    },
    {
        path: 'tendance-moyenne',
        loadChildren: () => import('./pagesDossiers/tendance-moyenne/tendance-moyenne.module').then(m => m.TendanceMoyennePageModule)
    },
    {
        path: 'classement-temps',
        loadChildren: () => import('./pagesDossiers/classement-temps/classement-temps.module').then(m => m.ClassementTempsPageModule)
    },
    {
        path: 'classement-dossier',
        loadChildren: () => import('./pagesDossiers/classement-dossier/classement-dossier.module').then(m => m.ClassementDossierPageModule)
    },
    {
        path: 'tendance-evolution',
        loadChildren: () => import('./pagesDossiers/tendance-evolution/tendance-evolution.module').then(m => m.TendanceEvolutionPageModule)
    },
    {
        path: '',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'change-password',
        loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
    },
    {
        path: 'change-profil',
        loadChildren: () => import('./pages/change-profil/change-profil.module').then(m => m.ChangeProfilPageModule)
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
