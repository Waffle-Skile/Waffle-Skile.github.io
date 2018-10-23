class Account():
    def __init__(self, _name):
      self.name = _name
      self.money = 0

    def __str__(self):
      return f"{self.name} {self.money}"

    def deposit(self, money):
      self.money += money

    def withdraw(self, money):
      if self.money >= money:
        self.money -= money
        return money
      return 0

jmlee = Account('이정민')
print(str(jmlee))
