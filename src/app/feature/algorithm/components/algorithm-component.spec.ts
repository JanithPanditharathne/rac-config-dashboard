import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs/internal/Subject';
import { of } from 'rxjs/internal/observable/of';

import { BsModalService } from 'ngx-bootstrap/modal';

import { DisplayAlgorithm } from '../models';
import { SuccessResponse } from '../../../core/models';
import { ActionClickEventArgs, ContainerDimensions } from '../../../shared/shared-common/models';

import { AlgorithmComponent } from './algorithm-component';

import { NotificationService } from '../../../core/services';
import { AlgorithmService } from '../../../shared/shared-algorithm/services';

describe('AlgorithmComponent tests', () => {
  let fixture: ComponentFixture<AlgorithmComponent>, component: AlgorithmComponent;

  let modalService: BsModalService, router: Router;

  let spyAlgorithmService: jasmine.SpyObj<AlgorithmService>, spyModalService: jasmine.SpyObj<BsModalService>;

  const spyNotificationService = jasmine.createSpyObj('NotificationService', ['showNotification']);
  const spyDataTable = jasmine.createSpyObj('DataTableComponent', ['fetchData']);

  let deleteAlgorithmSubject: Subject<SuccessResponse>, onSubmitSubject: Subject<ActionClickEventArgs>;

  const mockAlgorithmService = jasmine.createSpyObj('AlgorithmService', ['getAlgorithms', 'deleteAlgorithm']);

  const mockDisplayAlgorithmResource: DisplayAlgorithm = {
    algorithms: [
      {
        id: '102',
        name: 'Best Sellers',
        defaultDisplayText: 'display text',
        description: 'description'
      },
      {
        id: '103',
        name: 'Top Trending',
        defaultDisplayText: 'display text',
        description: 'description'
      }
    ]
  };

  beforeEach(async(() => {
    deleteAlgorithmSubject = new Subject<SuccessResponse>();
    onSubmitSubject = new Subject<ActionClickEventArgs>();

    mockAlgorithmService.getAlgorithms.and.returnValue(of(mockDisplayAlgorithmResource));

    const content = {
      content: {
        setAlgorithmFormData: () => {
        },
        autoResolve: false,
        onSubmit: onSubmitSubject
      },
      hide: () => {
      },
      setClass: (a: any) => {
      }
    };

    spyModalService = jasmine.createSpyObj('BsModalService', ['show']);
    spyModalService.show.and.returnValue(content);

    spyAlgorithmService = jasmine.createSpyObj('AlgorithmService', ['getAlgorithms', 'deleteAlgorithm']);
    spyAlgorithmService.deleteAlgorithm.and.returnValue(deleteAlgorithmSubject);

    const promise = Promise.resolve('');
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(promise);

    TestBed.configureTestingModule({
      declarations: [AlgorithmComponent],
      providers: [
        {provide: AlgorithmService, useValue: mockAlgorithmService},
        {provide: BsModalService, useValue: spyModalService},
        {provide: Router, useValue: mockRouter},
        {provide: NotificationService, useValue: spyNotificationService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AlgorithmComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;

    modalService = TestBed.get(BsModalService);
    router = TestBed.get(Router);

    component.onDataTableInit(spyDataTable);
  }));

  describe('constructor tests', () => {
    it('should initialize dataSource with http response by getAlgorithms', () => {
      component.dataSource.subscribe(response => {
        expect(response).toEqual(mockDisplayAlgorithmResource.algorithms);
      });
    });
  });

  describe('#containerResponsive tests', () => {
    const mockDimensions: ContainerDimensions = {
      width: 50,
      height: 50
    };

    it('should initialize component height with parameter height', () => {
      component.containerResponsive(mockDimensions);
      expect(component.height).toBe(mockDimensions.height);
    });
  });

  describe('#onAddClick tests', () => {
    const expectedPath = ['algorithms/add'];

    it('should navigate to add new algorithm window on a success add click event', () => {
      component.onAddClick();
      expect(router.navigate).toHaveBeenCalledWith(expectedPath);
    });
  });

  describe('#onEditClick tests', () => {
    const expectedPath = ['algorithms/edit', '100'];

    it('should navigate to edit algorithm window on a success edit click event', () => {
      component.onEditClick('100');
      expect(router.navigate).toHaveBeenCalledWith(expectedPath);
    });
  });

  describe('#containerResponsive tests', () => {
    const mockDimensions: ContainerDimensions = {
      height: 50,
      width: 50
    };

    it('should initialize component height by parameterized dimensions height', () => {
      component.containerResponsive(mockDimensions);
      expect(component.height).toBe(mockDimensions.height);
    });
  });

  describe('#openDeleteConfirmModal tests', () => {

    it('should call algorithm service with expected arguments', () => {
      component.openDeleteConfirmModal('100', 'Test algo');
      expect(modalService.show).toHaveBeenCalled();
    });
  });
});
