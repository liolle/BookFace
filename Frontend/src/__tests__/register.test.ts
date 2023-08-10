import { checkEmail, checkPassword } from '../utils/library' 

describe('Email helper', () => {

  it('Valid email', () => {

    const validEmail1 = "user@example.com";
    const validEmail2 = "john.doe123@gmail.com";
    const validEmail3 = "alice.smith+work@example.co.uk";
    const validEmail4 = "user123@subdomain.example.org";
    const validEmail5 = "support@123.museum";

    expect(checkEmail(validEmail1)).toEqual(true)
    expect(checkEmail(validEmail2)).toEqual(true)
    expect(checkEmail(validEmail3)).toEqual(true)
    expect(checkEmail(validEmail4)).toEqual(true)
    expect(checkEmail(validEmail5)).toEqual(true)
    
  })
  
  it ('Invalid email',()=>{

    const invalidEmail1 = "userexample.com";
    const invalidEmail2 = "john.doe@gmail";
    const invalidEmail3 = "@example.com";
    const invalidEmail4 = "user@.com";
    const invalidEmail5 = "user@exam_ple.com";
    const invalidEmail6 = "user@exa#mple.com";

    expect(checkEmail(invalidEmail1)).toEqual(false)
    expect(checkEmail(invalidEmail2)).toEqual(false)
    expect(checkEmail(invalidEmail3)).toEqual(false)
    expect(checkEmail(invalidEmail4)).toEqual(false)
    expect(checkEmail(invalidEmail5)).toEqual(false)
    expect(checkEmail(invalidEmail6)).toEqual(false)

  })

  
})


describe('Password helper', () => {

  it('Password length', () => {

    expect(checkPassword("")).toEqual(false)
    expect(checkPassword("1")).toEqual(false)
    expect(checkPassword("a1")).toEqual(false)
    expect(checkPassword("aze")).toEqual(false)

    expect(checkPassword("aaaa")).toEqual(true)
    expect(checkPassword("1axcfg")).toEqual(true)
    expect(checkPassword("a1azert")).toEqual(true)
    
  })
  
})