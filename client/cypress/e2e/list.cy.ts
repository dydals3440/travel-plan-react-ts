describe('template spec', () => {
  // 독립성 보장
  beforeEach(() => {
    cy.visit('/');
  });

  it('국가 필터를 선택했을 때, 필터된 리스트가 잘 노출되어야 한다.', () => {
    // findByTestId -> 1개 또는 0개
    cy.findAllByTestId('city-card').should('have.length.greaterThan', 0);
    // cityCount에 city-card의 개수를 저장
    let totalCount = 0;
    cy.findAllByTestId('city-card')
      .its('length')
      .then((count) => {
        totalCount = count;

        // 국가 필터 선택
        cy.findByText('국내').click();
        cy.findAllByTestId('city-card').should(
          'have.length.lessThan',
          totalCount
        );
      });
  });

  it('검색을 입력했을 때 검색결과가 잘 노출되어야 한다.', () => {
    cy.findByText('전체').click();
    cy.findAllByTestId('city-card').should('have.length.gt', 1);

    // 타입이 텍스트인 인풋을 찾아서 겁색해줌
    cy.findByRole('textbox').type('서울');
    cy.findAllByTestId('city-card').should('have.length', 1);
  });

  it('도시 카드를 클릭했을 떄 도시에 대한 상세 모달이 노출되어야 한다.', () => {
    cy.findByText('SEOUL').click();
    // dialog role을 가진 엘리먼트가 존재하는지 확인
    cy.findByRole('dialog').should('exist');
  });

  it('도시 상세 모달에서 일정 만들기 버튼을 클릭했을 때, 일정 페이지로 이동해야 한다.', () => {
    cy.findByText('SEOUL').click();
    // dialog role을 가진 엘리먼트가 존재하는지 확인
    cy.findByRole('dialog').should('exist');
    cy.findByText('일정 만들기').click();
    cy.url().should('include', '/plan/seoul');
  });
});
