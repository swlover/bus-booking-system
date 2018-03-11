export class BookTicketResponseModel{
  public type: string;
  public seats: BusSeatInfoModel[];
}

export class BusSeatInfoModel {
  public seatNo: number;
  public status: string;
  public category: number;
  public bookedBy: string;
  public gender: string;
  public row: number;
}
