import { MovementRepository } from "@/api/repositories/movement.repository";
import { SaveParameters, ListParameters } from "@/models/movement/service.model";
import { MovementModel } from "@/models/movement/movement.model";
import { OrderEnum } from "@/enums/order.enum";
import { MovementService } from "@/services/services/movement.service";
import { MovementTypeEnum } from "@/enums/movement_type.enum";

jest.mock("@/api/repositories/movement.repository");

describe("MovementService", () => {
  let service: MovementService;
  let repository: jest.Mocked<MovementRepository>;

  beforeEach(() => {
    repository = new MovementRepository() as jest.Mocked<MovementRepository>;
    service = new MovementService();
    (service as any)._repository = repository;
  });

  describe("create", () => {
    it("should create a movement successfully", async () => {
      const model: MovementModel = {
        id: '',
        name: "Test",
        price: 100,
        createdAt: "2025-02-11",
        description: '',
        type: MovementTypeEnum.INPUT
      };
      const params: SaveParameters = {
        model,
        callback: jest.fn(),
        error: jest.fn()
      };

      repository.create.mockResolvedValue(model);

      await service.create(params);

      expect(repository.create).toHaveBeenCalledWith(model);
      expect(params.callback).toHaveBeenCalledWith(model);
      expect(params.error).not.toHaveBeenCalled();
    });

    it("should handle validation errors", async () => {
      const model: MovementModel = {
        id: '',
        name: "",
        price: 0,
        createdAt: "",
        description: '',
        type: MovementTypeEnum.ALLTYPES
      };
      const params: SaveParameters = {
        model,
        callback: jest.fn(),
        error: jest.fn()
      };

      await service.create(params);

      expect(repository.create).not.toHaveBeenCalled();
      expect(params.callback).not.toHaveBeenCalled();
      expect(params.error).toHaveBeenCalledWith("Data inválida!");
    });

    it("should handle repository errors", async () => {
      const model: MovementModel = {
        id: '',
        name: "Test",
        price: 100,
        createdAt: "2025-02-11",
        description: '',
        type: MovementTypeEnum.INPUT
      };
      const params: SaveParameters = {
        model,
        callback: jest.fn(),
        error: jest.fn()
      };

      repository.create.mockRejectedValue(new Error("Repository error"));

      await service.create(params);

      expect(repository.create).toHaveBeenCalledWith(model);
      expect(params.callback).not.toHaveBeenCalled();
      expect(params.error).toHaveBeenCalledWith("Não foi possivel criar a movimentação!");
    });
  });

  describe("list", () => {
    it("should list movements successfully", async () => {
      const movements: MovementModel[] = [
        { id: '1', name: "Test1", price: 100, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.INPUT },
        { id: '2', name: "Test2", price: 200, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.INPUT }
      ];
      const params: ListParameters = {
        filter: {},
        order: OrderEnum.NAME_ASC,
        callback: jest.fn(),
        error: jest.fn()
      };

      repository.list.mockResolvedValue(movements);

      await service.list(params);

      expect(repository.list).toHaveBeenCalled();
      expect(params.callback).toHaveBeenCalledWith(movements);
      expect(params.error).not.toHaveBeenCalled();
    });

    it("should handle repository errors", async () => {
      const params: ListParameters = {
        filter: {},
        order: OrderEnum.NAME_ASC,
        callback: jest.fn(),
        error: jest.fn()
      };

      repository.list.mockRejectedValue(new Error("Repository error"));

      await service.list(params);

      expect(repository.list).toHaveBeenCalled();
      expect(params.callback).not.toHaveBeenCalled();
      expect(params.error).toHaveBeenCalledWith("Não foi possivel listar as movimentações!");
    });

    it("should list only one type", async () => {
      const movements: MovementModel[] = [
        { id: '1', name: "Test1", price: 100, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.INPUT },
        { id: '2', name: "Test2", price: -200, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.OUTPUT }
      ];
      const params: ListParameters = {
        filter: { type: MovementTypeEnum.INPUT },
        order: OrderEnum.NAME_ASC,
        callback: jest.fn(),
        error: jest.fn()
      };

      repository.list.mockResolvedValue(movements);

      await service.list(params);

      expect(repository.list).toHaveBeenCalled();
      expect(params.callback).toHaveBeenCalledWith([movements[0]]);
      expect(params.error).not.toHaveBeenCalled();
    });

    it("should order by name", async () => {
      const movements: MovementModel[] = [
        { id: '1', name: "wTest", price: 100, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.INPUT },
        { id: '2', name: "aTest", price: -200, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.OUTPUT },
        { id: '2', name: "gTest", price: 200, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.INPUT },
        { id: '2', name: "bTest", price: -100, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.OUTPUT }
      ];
      const expected: MovementModel[] = [
        { id: '2', name: "aTest", price: -200, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.OUTPUT },
        { id: '2', name: "bTest", price: -100, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.OUTPUT },
        { id: '2', name: "gTest", price: 200, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.INPUT },
        { id: '1', name: "wTest", price: 100, createdAt: "2025-02-11", description: '', type: MovementTypeEnum.INPUT }
      ];
      const params: ListParameters = {
        filter: {},
        order: OrderEnum.NAME_ASC,
        callback: jest.fn(),
        error: jest.fn()
      };

      repository.list.mockResolvedValue(movements);

      await service.list(params);

      expect(repository.list).toHaveBeenCalled();
      expect(params.callback).toHaveBeenCalledWith(expected);
      expect(params.error).not.toHaveBeenCalled();
    });
  });
});
