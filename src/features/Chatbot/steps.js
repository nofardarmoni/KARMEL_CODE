import { postData } from "@services/api-service";

const NAME_REGEX = /^(([א-ת][\s'"-]?){1,20})$/;
const PHONE_REGEX = /^05\d-?\d{7}$/;
const ROLE_REGEX = /^(([א-ת0-9]([\s,.'"-]+)?){1,30})$/;
const PHONE_NUMBER = "052-945-5830";

export const steps = [
  {
    id: "hello",
    message: "אהלן! אני כרמל-בוט 😊",
    trigger: "details",
  },
  {
    id: "details",
    message: "על מנת לעזור לך בצורה הטובה ביותר, אשמח לקבל ממך קצת פרטים",
    trigger: "getName",
  },
  {
    id: "getName",
    message: "איך קוראים לך?",
    trigger: "name",
  },
  {
    id: "name",
    user: true,
    validator: (value) => {
      if (!NAME_REGEX.test(value)) {
        return "שם לא חוקי";
      }

      return true;
    },
    trigger: ({ value }) => {
      localStorage.setItem("chatbotName", value);
      return "getPhone";
    },
  },
  {
    id: "getPhone",
    message: () => {
      const name = localStorage.getItem("chatbotName");
      return `היי ${name}, מה מספר הטלפון שלך?`;
    },
    trigger: "phone",
  },
  {
    id: "phone",
    user: true,
    validator: (value) => {
      if (!PHONE_REGEX.test(value)) {
        return "מספר נייד לא חוקי";
      }

      return true;
    },
    trigger: ({ value }) => {
      localStorage.setItem("chatbotPhone", value);
      return "getRole";
    },
  },
  {
    id: "getRole",
    message: "פרט אחרון, מה התפקיד שלך?",
    trigger: "role",
  },
  {
    id: "role",
    user: true,
    validator: (value) => {
      if (!ROLE_REGEX.test(value)) {
        return "תפקיד לא חוקי";
      }

      return true;
    },
    trigger: ({ value }) => {
      localStorage.setItem("chatbotRole", value);
      return "getTopic";
    },
  },
  {
    id: "getTopic",
    message: "איך אפשר לעזור?",
    trigger: "topic",
  },
  {
    id: "topic",
    options: [
      {
        value: "תקלה",
        label: "אני רוצה לדווח על תקלה",
        trigger: "error",
      },
      {
        value: "שיפור",
        label: "יש לי רעיון לשיפור",
        trigger: "idea",
      },
      {
        label: "עריכת פרטים אישיים",
        trigger: "getName",
      },
    ],
  },
  {
    id: "error",
    message: "אוי לא, ספר לי מה קרה",
    trigger: "getComment",
  },
  {
    id: "idea",
    message: "סקרנת אותי, ספר לי עוד",
    trigger: "getComment",
  },
  {
    id: "getComment",
    message: "נסה לפרט כמה שיותר בהודעה אחת בלבד",
    trigger: "comment",
  },
  {
    id: "comment",
    user: true,
    trigger: ({ steps }) => {
      let data = {
        name: localStorage.getItem("chatbotName"),
        phone: localStorage.getItem("chatbotPhone"),
        role: localStorage.getItem("chatbotRole"),
      };

      Object.values(steps)
        .filter((step) => step.value !== undefined)
        .forEach((step) => (data[step.id] = step.value));

      postData("chatbot", data);
      return "success";
    },
  },
  {
    id: "success",
    message: "פנייתך נשלחה בהצלחה!",
    trigger: "helpAgain",
  },
  {
    id: "helpAgain",
    message: "אפשר לעזור בעוד משהו?",
    trigger: "againOrEnd",
  },
  {
    id: "againOrEnd",
    options: [
      {
        value: true,
        label: "כן בבקשה!",
        trigger: "getTopic",
      },
      {
        value: false,
        label: "לא, אני מסודר",
        trigger: "otherQuestions",
      },
    ],
  },
  {
    id: "otherQuestions",
    message: `מעולה! לשאלות נוספות ניתן לפנות לצוות הטכני שלנו בטלפון ${PHONE_NUMBER}`,
    trigger: "end",
  },
  {
    id: "end",
    message: "תודה ויום טוב!",
    end: true,
  },
];

export const noPhoneSteps = [
  {
    id: "noPhone",
    message: `אוי, לא הספקתי לקחת ממך את כל הפרטים!`,
    trigger: "getPhone",
  },
  ...steps,
];

export const noRoleSteps = [
  {
    id: "noRole",
    message: `אוי, לא הספקתי לקחת ממך את כל הפרטים!`,
    trigger: "getRole",
  },
  ...steps,
];

export const shortSteps = [
  { id: "wakeUp", message: "...", trigger: "short" },
  {
    id: "short",
    message: () => {
      const name = localStorage.getItem("chatbotName");
      return `היי ${name}! 😊`;
    },
    trigger: "getTopic",
  },
  ...steps,
];
