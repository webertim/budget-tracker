type Budget = {
  createdAtDate: Date;
  value: number;
};

type Payment = {
  id: string;
  createdAtDate: Date;
  value: number;
  description?: string;
};

export type { Budget, Payment };
