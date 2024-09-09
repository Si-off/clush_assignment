# 클러쉬 프론트엔드 과제테스트
## 배포 링크
https://clush-assignment.vercel.app

</br>

## 설치 및 실행
### 요구사항
- yarn
- node.js 18+

### 패키지 설치
```
yarn install
```

### 개발환경 실행
```
yarn dev
```

</br>

## 기술스택
- `React v18`
- `Ant-Design v5`
- `react-router-dom`: 일정, 캘린더 페이지 전환을 위해 사용하였습니다.
- `zustand`: 일정(Todo) 데이터를 전역으로 관리하기 위해 사용한 상태관리 라이브러리입니다..
- `styled-components`: Ant-design 컴포넌트의 스타일을 커스텀하거나 필요한 스타일을 작성하기 위해 사용한 CSS-in-JS 라이브러리입니다.

</br>

## 기능
### 달력
- 일 별로 추가한 일정을 확인, 편집할 수 있습니다.
- 달력의 연, 월을 클릭하여 날짜를 변경할 수 있습니다.
- 마우스 휠을 사용하여 이전, 다음 달로 이동할 수 있습니다.
![캘린더](https://github.com/user-attachments/assets/fd74bbf9-3f24-45ff-b966-0427ee27bd06)
![달력시연](https://github.com/user-attachments/assets/14581920-bdb7-4a38-a005-b3ac048ed790)

### 일정 목록
- 월 별로 추가한 일정을 확인하고 편집할 수 있습니다.
![일정페이지](https://github.com/user-attachments/assets/8264f2da-c136-4ea9-84eb-c2eb6e6d85e0)
![일정시연](https://github.com/user-attachments/assets/082d95df-7fde-459c-bc91-fed2103bced1)

</br>

## 주력으로 사용한 컴포넌트
- `Select`
Ant Design의 기본 Calendar 헤더를 커스터마이징하기 위해 Select를 기반으로 DateSelect 컴포넌트를 구현하였습니다. type prop을 사용하여 렌더링 시 Select 옵션을 조정할 수 있습니다.
```jsx
<DateSelect
  type='year' // 'year' | 'month'
  defaultValue={selected.get('year')}
  value={selected.get('year')}
  onChange={(value) => setSelected(selected.set('year', value))}
/>
```

</br>

- `Modal`
일정 추가, 삭제, 수정 기능을 모달을 통해 처리하였습니다. 여러 컴포넌트에서 모달이 필요했기 때문에 재사용성을 높이기 위해 Modal 컴포넌트를 분리하였으며, 부모 컴포넌트에서 모달의 열림/닫힘 상태를 제어할 수 있도록 useImperativeHandle 훅을 사용하였습니다.
`useImperativeHandle` 훅은 부모 컴포넌트에서 전달 받은 ref로 모달 컴포넌트의 `openModal()`, `closeModal()`을 전달합니다.

```jsx
const modalRef = useRef<ModalImperativeHandle>(null);

const handleOpenModal = () => {
  if (modalRef.current) modalRef.current.openModal();
};

...
<FloatButton type='primary' icon={<PlusOutlined />} onClick={handleOpenModal} />
```

</br>

- `Layout`, `Sider`, `Menu`: 페이지 레이아웃, 네이게이션을 구성하기 위해 사용했습니다.
- `Tooltip`, `FloatButton`: 일정 추가 버튼을 위해 사용한 FloatButton이 어떤 기능을 하는지 표현하기 위해 `Tooltip`과 함께 사용하였습니다.
- `Calendar`: 휠 입력을 통해 날짜 이동을 편하게 할 수 있도록 기능을 추가하였고, 일 별로 추가된 일정이 렌더링 될 수 있도록 하였습니다.
