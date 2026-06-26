// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: Imports de Angular
// Se importan solo las piezas necesarias del framework.
// Angular es modular: nada viene "de golpe", tú eliges qué usar.
//   - Component     → decorador que convierte una clase en componente
//   - Input         → permite recibir datos del componente padre
//   - Output        → permite enviar eventos al componente padre
//   - EventEmitter  → el objeto que "dispara" esos eventos hacia arriba
//   - signal        → primitiva reactiva de Angular (nuevo modelo reactivo)
//   - HostListener  → escucha eventos del DOM desde la clase TypeScript
// ─────────────────────────────────────────────────────────────────────────────
import { Component, Input, Output, EventEmitter, signal, HostListener } from '@angular/core';

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: Interface de TypeScript
// Define la "forma" que deben tener los objetos NavLink.
// No es Angular puro, es TypeScript — ayuda al compilador a detectar errores
// antes de que la app corra (tipado estático).
// ─────────────────────────────────────────────────────────────────────────────
interface NavLink {
  label: string; // texto visible del enlace
  href: string;  // ancla destino, ej: '#about'
}

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: @Component (decorador)
// Los decoradores empiezan con @ y añaden metadatos a una clase.
// @Component le dice a Angular: "esta clase es un componente".
//
//   selector       → el nombre del tag HTML que usaremos: <app-navbar-component>
//   imports        → en componentes standalone se declaran aquí las dependencias
//                    del template (otros componentes, directivas, pipes…).
//                    En este caso el template no usa ningún otro componente de
//                    Angular (solo HTML nativo), por eso el array está vacío.
//   templateUrl    → ruta al archivo HTML que define la vista
//   styleUrl       → ruta al CSS propio de este componente (scoped por defecto)
// ─────────────────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  // ───────────────────────────────────────────────────────────────────────────
  // CONCEPTO: @Input()
  // Permite que el PADRE le pase datos a este componente.
  // Uso en el padre: <app-navbar-component [darkMode]="true" />
  //
  // 'darkMode = false' es el valor por defecto si el padre no envía nada.
  // ───────────────────────────────────────────────────────────────────────────
  @Input() darkMode = false;

  // ───────────────────────────────────────────────────────────────────────────
  // CONCEPTO: @Output() + EventEmitter
  // Permite que este componente le AVISE al padre cuando algo ocurre.
  // El padre escucha así: <app-navbar-component (toggleDarkMode)="miMetodo()" />
  //
  // EventEmitter<void> → el evento no envía ningún dato extra (solo la señal).
  // Si quisiéramos enviar un valor haríamos EventEmitter<boolean>, etc.
  // ───────────────────────────────────────────────────────────────────────────
  @Output() toggleDarkMode = new EventEmitter<void>();

  // ───────────────────────────────────────────────────────────────────────────
  // CONCEPTO: signal()
  // Los Signals son el nuevo sistema reactivo de Angular (v17+).
  // Un signal es un valor que, cuando cambia, Angular actualiza automáticamente
  // solo las partes del template que lo usan — sin necesidad de Zone.js.
  //
  // Para LEER su valor en TypeScript: this.scrolled()   (se llama como función)
  // Para LEER su valor en el template: scrolled()
  // Para CAMBIAR su valor:            this.scrolled.set(true)
  //
  // Diferencia con una variable normal: Angular "sabe" cuándo cambia un signal
  // y actualiza el DOM de forma precisa y eficiente.
  // ───────────────────────────────────────────────────────────────────────────
  scrolled = signal(false);   // true cuando el usuario ha bajado más de 20px
  mobileOpen = signal(false); // true cuando el menú hamburguesa está abierto

  // ───────────────────────────────────────────────────────────────────────────
  // CONCEPTO: Propiedad de clase (array de objetos tipados)
  // navLinks es un array normal de TypeScript con la forma de NavLink.
  // El template lo recorre con @for para generar los botones de navegación.
  // ───────────────────────────────────────────────────────────────────────────
  navLinks: NavLink[] = [
    { label: 'About',      href: '#about'      },
    { label: 'Expertise',  href: '#expertise'  },
    { label: 'Projects',   href: '#projects'   },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact',    href: '#contact'    },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // CONCEPTO: @HostListener
  // Escucha eventos del DOM directamente desde la clase, sin tocar el template.
  // 'window:scroll' → se dispara cada vez que el usuario hace scroll en la página.
  //
  // Alternativa sin @HostListener: añadir (scroll) en algún elemento del HTML,
  // pero @HostListener es más limpio cuando el evento es global (window, document).
  // ───────────────────────────────────────────────────────────────────────────
  @HostListener('window:scroll')
  onScroll(): void {
    // window.scrollY → cuántos píxeles se ha desplazado la página verticalmente.
    // Si superan 20px, activamos el signal 'scrolled' para cambiar el estilo del nav.
    this.scrolled.set(window.scrollY > 20);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // CONCEPTO: Métodos de la clase (lógica del componente)
  // La clase contiene la lógica; el template la consume mediante event binding (click).
  // ───────────────────────────────────────────────────────────────────────────

  // Navega suavemente hacia una sección de la página y cierra el menú móvil.
  // 'href' es un selector CSS como '#about'; querySelector lo busca en el DOM.
  handleNav(href: string): void {
    this.mobileOpen.set(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' }); // animación de scroll nativa del browser
  }

  // Lleva al usuario al inicio de la página con animación suave.
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Alterna el estado del menú móvil: abierto ↔ cerrado.
  // signal() no tiene toggle nativo, por eso leemos el valor actual con () y lo negamos.
  toggleMobile(): void {
    this.mobileOpen.set(!this.mobileOpen());
  }
}
