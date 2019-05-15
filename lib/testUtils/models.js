import faker from "faker";


faker.seed(1779);

export const fakeUser = () => ({
    __typename: "User",
    id: faker.random.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip5: "55555",
    phone: faker.phone.phoneNumber(), 
    active: true,
    globalPermissions: [],
    teamPermissions: [],
})

export const fakeTeam = () => ({
    __typename: "Team",
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    description: faker.lorem.paragraphs(),
    active: true,
    userPermissionSummaryCounts: [],
    slug: faker.random.uuid(),
})