import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SidebarComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the sidebar component', () => {
        expect(component).toBeTruthy();
    });

    it('should have isCollapsed initially false', () => {
        expect(component.isCollapsed).toBeFalse();
    });

    it('should toggle isCollapsed to true', () => {
        component.toggleSidebar();
        expect(component.isCollapsed).toBeTrue();
    });

    it('should toggle isCollapsed back to false', () => {
        component.isCollapsed = true;
        component.toggleSidebar();
        expect(component.isCollapsed).toBeFalse();
    });
});
