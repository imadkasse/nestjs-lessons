# فهم Dependency Injection في Node.js و NestJS

## **ما هو Dependency Injection (DI)؟**

**Dependency Injection (DI)** هو نمط تصميم (Design Pattern) يُستخدم لإدارة الاعتمادات (Dependencies) داخل التطبيقات. بدلًا من أن تقوم المكونات (Components) بإنشاء الاعتمادات التي تحتاجها بشكل مباشر، يتم توفير هذه الاعتمادات من مصدر خارجي (حقنها).

هذا الأسلوب يزيد من قابلية الصيانة والاختبار وفصل المسؤوليات بين أجزاء التطبيق.

---

## **فوائد استخدام Dependency Injection**

1. **القابلية للتوسّع**: يمكن استبدال أو تعديل الاعتمادات بسهولة دون التأثير على الكود المرتبط بها.
2. **سهولة الاختبار**: يمكن توفير اعتمادات وهمية (Mocks) لاختبار المكونات بشكل مستقل.
3. **فصل المسؤوليات**: يقلل من الترابط المباشر بين المكونات، مما يسهل تطويرها بشكل منفصل.
4. **إعادة الاستخدام**: يمكن إعادة استخدام الاعتمادات عبر عدة مكونات.

---

## **كيف يعمل Dependency Injection؟**

### **الخطوات الأساسية:**

1. **تعريف الاعتمادات**: تحديد الموارد أو الخدمات التي يحتاجها الكائن.
2. **تسجيل الاعتمادات**: جعل هذه الاعتمادات متاحة باستخدام نظام وحدات (Modules) أو حاوية (Container).
3. **حقن الاعتمادات**: توفير الاعتمادات باستخدام المُنشئ (Constructor) أو المُدخلات (Setters).

---

## **مثال على DI في Node.js**

### **بدون DI:**

```javascript
class UserService {
  getUsers() {
    return ['User1', 'User2', 'User3'];
  }
}

class UserController {
  constructor() {
    this.userService = new UserService(); // ترابط مباشر
  }

  getAllUsers() {
    return this.userService.getUsers();
  }
}

const controller = new UserController();
console.log(controller.getAllUsers());
```

### **مع DI:**

```javascript
class UserService {
  getUsers() {
    return ['User1', 'User2', 'User3'];
  }
}

class UserController {
  constructor(userService) {
    this.userService = userService; // الاعتماد يتم حقنه
  }

  getAllUsers() {
    return this.userService.getUsers();
  }
}

// حقن الاعتماد
const userService = new UserService();
const controller = new UserController(userService);
console.log(controller.getAllUsers());
```

---

## **Dependency Injection في NestJS**

يوفر NestJS نظام DI مدمج يعتمد على مبدأ **Inversion of Control (IoC)**. يتم ذلك باستخدام ديكوراتورات مثل `@Injectable` و `@Inject`.

---

### **مثال عملي على DI في NestJS**

#### **تعريف خدمة:**

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers() {
    return ['User1', 'User2', 'User3'];
  }
}
```

#### **استخدام الخدمة في وحدة تحكم (Controller):**

```typescript
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getUsers();
  }
}
```

#### **تسجيل الاعتمادات في الوحدة (Module):**

```typescript
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

---

## **كيفية اختبار الكود باستخدام DI**

يمكن استبدال الاعتمادات بخدمات وهمية (Mocks) عند الاختبار:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService = { getUsers: jest.fn(() => ['MockUser1', 'MockUser2']) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should return a list of users', () => {
    expect(userController.findAll()).toEqual(['MockUser1', 'MockUser2']);
  });
});
```

---

## **خاتمة**

Dependency Injection هو جزء أساسي من بناء تطبيقات قابلة للصيانة وقابلة للاختبار. يساعد على تقليل الترابط المباشر بين المكونات وتحسين بنية الكود. NestJS يوفر DI كميزة أساسية، مما يجعل تطوير التطبيقات أكثر تنظيمًا ومرونة.
