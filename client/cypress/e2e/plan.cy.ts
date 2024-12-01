import { addDays, format } from 'date-fns';

describe('여행 계획 페이지', () => {
  // e2e 테스트는, 통합 테스트와 다르게, 유저의 플로우를 테스트하는 방법, 특정 아이템이, 존재한다던가, 이런 부분을 테스트하는게 아닌, 유저처럼 여행 계획을 짤 수 있도록, 가능한지 테스트하도록 작성 함.
  it('여행 일정을 만들 수 있어야 한다.', () => {
    cy.visit('/plan/seoul');

    // 여해 기간을 선택한다.
    const date = new Date(); // 2024/01/01
    const DATE_FORMAT = 'yyyy년 M월 d일';

    cy.findByRole('option', { name: new RegExp(format(date, DATE_FORMAT)) })
      .should('exist')
      .click();

    // 기준 날짜로부터 2일 뒤의 날짜
    const after2Days = addDays(date, 2);
    console.log(after2Days);
    cy.findAllByRole('option', {
      name: new RegExp(format(after2Days, DATE_FORMAT)),
    })
      .should('exist')
      .click();
  });
});
