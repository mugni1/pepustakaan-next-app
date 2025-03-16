import Container from "../Admin/Container";
import MainContainer from "../Admin/MainContainer";

interface Book {
  title: string;
}

interface User {
  full_name: string;
  username: string;
}

interface Transaction {
  borrow_date: string;
  daily_fine: number;
  actual_return_date: string;
  status: string;
  book: Book;
  user: User;
}

interface DetailTransaction {
  id: number;
  amount: number;
  borrowing: Transaction;
  transaction_type: string;
}

export default function HistoryTransactionsList({
  datas,
}: {
  datas: DetailTransaction[];
}) {
  console.log(datas);
  return (
    <MainContainer>
      <Container>
        <h1>Details</h1>
      </Container>
    </MainContainer>
  );
}
