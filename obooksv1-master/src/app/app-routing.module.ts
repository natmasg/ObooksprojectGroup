import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./userChangesPages/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'nickname',
    loadChildren: () => import('./userChangesPages/nickname/nickname.module').then( m => m.NicknamePageModule)
  },
  {
    path: 'email',
    loadChildren: () => import('./userChangesPages/email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./helpPages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./helpPages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./creationPages/library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'offline-book',
    loadChildren: () => import('./creationPages/offline-book/offline-book.module').then( m => m.OfflineBookPageModule)
  },
  {
    path: 'book-detail',
    loadChildren: () => import('./book-detail/book-detail.module').then( m => m.BookDetailPageModule)
  },
  {
    path: 'viewer',
    loadChildren: () => import('./viewer/viewer.module').then( m => m.ViewerPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./userIdentificationPages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./userIdentificationPages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register-page2',
    loadChildren: () => import('./userIdentificationPages/register-page2/register-page2.module').then( m => m.RegisterPage2PageModule)
  },
  {
    path: 'register-page3',
    loadChildren: () => import('./userIdentificationPages/register-page3/register-page3.module').then( m => m.RegisterPage3PageModule)
  },
  {
    path: 'register-page4',
    loadChildren: () => import('./userIdentificationPages/register-page4/register-page4.module').then( m => m.RegisterPage4PageModule)
  },
  {
    path: 'library-detail',
    loadChildren: () => import('./library-detail/library-detail.module').then( m => m.LibraryDetailPageModule)
  },
  {
    path: 'library-selector',
    loadChildren: () => import('./creationPages/library-selector/library-selector.module').then( m => m.LibrarySelectorPageModule)
  },
  {
    path: 'name',
    loadChildren: () => import('./userChangesPages/name/name.module').then( m => m.NamePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
